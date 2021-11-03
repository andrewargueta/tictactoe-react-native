import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Logo extends Component {
  
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>
            Tic Tac Toe.io
          </Text>  
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#2BC3D5',
    flexDirection: 'column'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  }
})
