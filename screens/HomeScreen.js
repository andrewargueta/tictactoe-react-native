import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import {auth} from '../firebase/firebaseConfig';

import Header from '../components/Header'


export default class App extends Component {
  
  constructor() {
    super()
    this.state={ gameStarted: false }
  }

  goTo(link) {
    this.props.navigation.navigate(link);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Header />
            <View>
              <Text style={styles.welcome}>
              </Text>
              <TouchableOpacity onPress={() => this.goTo("Register")}>
                <Text style={styles.instructions}>
                  Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.goTo("Login")}>
                <Text style={styles.instructions}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
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