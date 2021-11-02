import React, { Component } from 'react'
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native'

import Circle from './Circle'
import Cross from './Cross'
import { CENTER_POINTS, AREAS, CONDITIONS, GAME_RESULT_NO, 
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
      round: 0
    }
  }

  restart() {
    const { round } = this.state
    this.setState({
      userInputs: [],
      computerInputs: [],
      result: GAME_RESULT_NO,
      round: round + 1
    })
    setTimeout(() => {
      if (round % 2 === 0) {
        this.AIAction()
      }
    }, 5)
  }

  boardClickHandler(e) {
    const { locationX, locationY } = e.nativeEvent
    const { userInputs, computerInputs, result } = this.state
    if (result !== -1) {
      return
    }
    const inputs = userInputs.concat(computerInputs)

    const area = AREAS.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY))

      if (area && inputs.every(d => d !== area.id)) {
        this.setState({ userInputs: userInputs.concat(area.id) })
        setTimeout(() => {
          this.judgeWinner()
          this.AIAction()
        }, 5)
      }
  }

  AIAction() {
    const { userInputs, computerInputs, result } = this.state
    if (result !== -1) {
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

  componentDidMount() {
    this.restart()
  }

  isWinner(inputs) {
    //returns -1 when there is no win condition
    return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1))
  }

  judgeWinner() {
    const { userInputs, computerInputs, result } = this.state
    const inputs = userInputs.concat(computerInputs)

    if (inputs.length >= 5 ) {
      let res = this.isWinner(userInputs)
      var scoresRef = db.collection('scores').doc(auth.currentUser.uid);
 
      if (res && result !== GAME_RESULT_USER) {  
        scoresRef.update({
          wins: firebase.firestore.FieldValue.increment(1)
      });
        return this.setState({ result: GAME_RESULT_USER })
      }
      res = this.isWinner(computerInputs)
      if (res && result !== GAME_RESULT_AI) {
        scoresRef.update({
          losses: firebase.firestore.FieldValue.increment(1)
        });
        return this.setState({ result: GAME_RESULT_AI })
      }
    }

    if (inputs.length === 9 &&
        result === GAME_RESULT_NO && result !== GAME_RESULT_TIE) {
          scoresRef.update({
            draws: firebase.firestore.FieldValue.increment(1)
          });
      this.setState({ result: GAME_RESULT_TIE })
    }
  }

  render() {
    const { userInputs, computerInputs, result } = this.state
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={e => this.boardClickHandler(e)}>
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
                  color='skyblue'
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
  }
});
