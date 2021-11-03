import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {auth, db} from '../firebase/firebaseConfig';

export default class ScoreBoard extends Component {
    constructor() {
        super();
        this.state = { 
          wins:0,
          losses:0,
          draws: 0
        }
      }

    /** If a game is over, we update the wins, losses, draws and display them  */
    componentDidUpdate(){
      if(auth.currentUser){
        db.collection('scores').doc(auth.currentUser.uid).get().then(snapshot => {  
          this.setState({  
                      wins: snapshot.data().wins,
                      losses: snapshot.data().losses,
                      draws: snapshot.data().draws
                  })
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });; 
      }
    }

    render() {
        
        return (
            <View>
              <Text style={styles.scores}>
              Games Won: {this.state.wins}         Games Loss: {this.state.losses}         Games Drawn: {this.state.draws}
              </Text>
            </View>
            )
        }
    }

const styles = StyleSheet.create({
  scores: {
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
    textAlign: 'center'
  },
})

