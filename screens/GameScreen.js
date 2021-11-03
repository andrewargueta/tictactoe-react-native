import React, { Component } from 'react'
import { StyleSheet, Button, View } from 'react-native'

import {auth} from '../firebase/firebaseConfig';

import Logo from '../components/Logo'
import GameBoard from '../components/GameBoard'


export default class App extends Component {
  
  constructor() {
    super()
  }

  /** Signs user out */
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
        <Logo />
        <GameBoard />
        <Button
          color="#F2545B"
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
    backgroundColor: "#F5FCFF",
  }
})