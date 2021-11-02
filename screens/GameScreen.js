import React, { Component } from 'react'
import { StyleSheet, Button, View } from 'react-native'

import {auth} from '../firebase/firebaseConfig';

import Header from '../components/Header'
import GameBoard from '../components/GameBoard'


export default class App extends Component {
  
  constructor() {
    super()
  }
  
  signOut = () => {
    auth.signOut().then(() => {
      this.props.navigation.navigate('Home')
    })
    .catch((error) => {
      alert(error);
    })   
  }  

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <GameBoard />
        <Button
          color="skyblue"
          title="Sign Out"
          onPress={this.signOut}
        /> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    marginTop: 50,
  },
  instructions: {
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
  },
})