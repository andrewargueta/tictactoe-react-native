import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { GAME_RESULT_NO, GAME_RESULT_USER, GAME_RESULT_AI, GAME_RESULT_TIE } from '../constants/game_constants'


export default class PromptArea extends Component {
  /** Returns a text based on who won  */
  generateResultText(result) {
    switch (result) {
      case GAME_RESULT_USER:
        return 'You won the game!'
      case GAME_RESULT_AI:
        return 'Computer won the game!'
      case GAME_RESULT_TIE:
        return 'Tie!'
      default:
        return ''
    }
  }

  render() {
    const { result, onRestart } = this.props
    return (
      <View>
        <Text style={styles.result}>{ this.generateResultText(result) }</Text>
        {
          result !== GAME_RESULT_NO && (
            <TouchableOpacity onPress={() => onRestart()}>
              <Text style={styles.prompt}>
                Touch here to play again
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  result: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  prompt: {
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
    textAlign: 'center'
  },
})
