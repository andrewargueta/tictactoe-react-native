import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import {auth, db} from '../firebase/firebaseConfig';
import Logo from '../components/Logo'


export default class RegisterScreen extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false
    }
  }

  /** Updates state based on input */
  changeInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  /** Goes to home page */
  goHome(){
    this.props.navigation.navigate('Home')
  }

  /** Registers user */
  handleRegister(){
    if(this.state.email === '' || this.state.password === '' || this.state.displayName === '') {
      alert('Enter all details');
    } else {
      this.setState({
        isLoading: true,
      })
      auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName,
        })
        db.collection("scores").doc(res.user.uid).set({
          userId: res.user.uid,
          wins: 0,
          losses: 0,
          draws: 0
      })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
        })
        this.props.navigation.navigate('Game')
      })
      .catch((error) => {
        alert(error);
        window.location.reload(false);
      })      
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
        <Logo />
        <TextInput
          style={styles.textInput}
          placeholder="Display Name"
          value={this.state.displayName}
          onChangeText={(val) => this.changeInput(val, 'displayName')}
        />      
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.changeInput(val, 'email')}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.changeInput(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#2BC3D5"
          title="Register"
          onPress={()=>this.handleRegister()}
        />
        <Button
          color="#F2545B"
          title="Cancel"
          onPress={()=>this.goHome()}
        />
        <Text 
          style={styles.login}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 35,
    backgroundColor: '#F5FCFF'
  },
  textInput: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  login: {
    color: '#2BC3D5',
    marginTop: 25,
    textAlign: 'center'
  },
  loading: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});