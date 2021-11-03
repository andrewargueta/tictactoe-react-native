import React, { Component } from 'react'
import { TouchableWithoutFeedback, View, StyleSheet, Text, TouchableHighlight } from 'react-native'

import Circle from './Circle'
import Cross from './Cross'
import { CENTER_POINTS, BOX_AREAS, WIN_CONDITIONS, GAME_RESULT_NO, 
  GAME_RESULT_USER, GAME_RESULT_AI, GAME_RESULT_TIE } from '../constants/game_constants'
import PromptArea from './PromptArea'
import ScoreBoard from './ScoreBoard';

import {auth, db,firebase} from '../firebase/firebaseConfig';


export default class GameBoard extends Component {

  constructor() {
    super()
    this.state= {
      computerInputs: [],
      userInputs: [],
      result: GAME_RESULT_NO,
      game: 0,
      isUserFirst: false
    }
  }

  componentDidMount() {
    this.restart()
  }

  /** Restarts board game, number of game goes up  */
  restart() {
    const { game } = this.state
    this.setState({
      userInputs: [],
      computerInputs: [],
      result: GAME_RESULT_NO,
      game: game + 1,
    })
    setTimeout(() => {
      if (!this.state.isUserFirst) {
        this.generateComputerTurn()
      }
    }, 5)
  }

  /** When user clicks board it gets position and gives it to the appropriate box  */
  handleBoardClick(e) {
    const { locationX, locationY } = e.nativeEvent
    const { userInputs, computerInputs, result } = this.state
    if (result !== -1) {
      return
    }
    const inputs = userInputs.concat(computerInputs)

    const area = BOX_AREAS.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY))

      if (area && inputs.every(d => d !== area.id)) {
        this.setState({ userInputs: userInputs.concat(area.id) })
        setTimeout(() => {
          this.judgeWinner()
          this.generateComputerTurn()
        }, 5)
      }
  }

  /** Picks a random box for the computer to place  */
  generateComputerTurn() {
    const { userInputs, computerInputs, result } = this.state
    if (result !== GAME_RESULT_NO) {
      return
    }
    while(true) {
      const inputs = userInputs.concat(computerInputs)
      const randomNumber = Math.round(Math.random() * 8.3)
      if (inputs.every(d => d !== randomNumber)) {
        this.setState({ computerInputs: computerInputs.concat(randomNumber) })
        this.judgeWinner()
        break
      }
    }
  }

  /** Checks if any inputs match a win condition if not return -1  */
  checkWinner(inputs) {
    return WIN_CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1))
  }

  /** Sees if theres a winner / has a winner has been chosen  */
  judgeWinner() {
    const { userInputs, computerInputs, result } = this.state
    const turns = userInputs.concat(computerInputs).length
    const scoresRef = db.collection('scores').doc(auth.currentUser.uid);
    //only check after 5 turns (someone went 3 times)
    if (turns >= 5 ) {
      var winner = this.checkWinner(userInputs)
      if (winner && result !== GAME_RESULT_USER) {  
        scoresRef.update({
          wins: firebase.firestore.FieldValue.increment(1)
      });
        return this.setState({ result: GAME_RESULT_USER })
      }
      winner = this.checkWinner(computerInputs)
      if (winner && result !== GAME_RESULT_AI) {
        scoresRef.update({
          losses: firebase.firestore.FieldValue.increment(1)
        });
        return this.setState({ result: GAME_RESULT_AI })
      }
    }
    //all boards are filled
    if (turns === 9 && result === GAME_RESULT_NO && result !== GAME_RESULT_TIE) {
          scoresRef.update({
            draws: firebase.firestore.FieldValue.increment(1)
          });
      this.setState({ result: GAME_RESULT_TIE })
    }
  }

  /** Changes who goes first at the start of the game  */
  changeFirstTurn(player){
    if(player === "User"){
      this.setState({ isUserFirst : true })
    }
    else{
      this.setState({ isUserFirst : false })
    }
  }

  render() {
    const { userInputs, computerInputs, result } = this.state
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={e => this.handleBoardClick(e)}>
          <View style={styles.board}>
            <View
              style={styles.line}
            />
            <View
              style={[styles.line, {
                width: 3,
                height: 306,
                transform: [
                  {translateX: 200}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 100}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 200}
                ]
              }]}
            />
            {
              userInputs.map((d, i) => (
                <Circle
                  key={i}
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                  color='#2BC3D5'
                />
              ))
            }
            {
              computerInputs.map((d, i) => (
                <Cross
                  key={i}
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                />
              ))
            }
          </View>
        </TouchableWithoutFeedback>
        
        <PromptArea result={result} onRestart={() => this.restart()} />
         
        <View style={{flexDirection:"row", flex:1, alignItems:"center", justifyContent:"center"}}>
            <Text>First Turn: </Text>   
            <TouchableHighlight 
              style={[styles.button, this.state.isUserFirst ? { backgroundColor: "#516F90" } : {}]}
              onPress={()=>this.changeFirstTurn("User")}>
              <Text style={styles.text}>USER</Text>
            </TouchableHighlight>
            <TouchableHighlight 
              style={[styles.button, !this.state.isUserFirst ? {backgroundColor: "#516F90" } : {}]}
              onPress={()=>this.changeFirstTurn("Computer")}>
              <Text style={styles.text}>COMPUTER</Text>
            </TouchableHighlight>
        </View>
            
        <ScoreBoard />

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  board: {
    width: 312,
    height: 312,
    borderWidth: 3,
    borderColor: '#000'
  },
  line: {
    position: 'absolute',
    width: 3,
    height: 306,
    backgroundColor: '#000',
    transform: [
      {translateX: 100}
    ]
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingRight: 15,
    borderRadius: 4,
    backgroundColor: "#2BC3D5" 
  },
  text: {
    letterSpacing: 0.25,
    color: 'white',
  },
});
