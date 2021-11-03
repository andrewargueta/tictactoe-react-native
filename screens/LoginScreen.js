import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import Logo from '../components/Logo'
import {auth} from '../firebase/firebaseConfig';


export default class LoginScreen extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }

  /** Updates state onn change */
  changeInput = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  /** Goes to home page */
  goHome(){
    this.props.navigation.navigate('Home')
  }

  /** Logs in user */
  handleLogin(){
    if(this.state.email === '' || this.state.password === '') {
      alert('Enter all details to login!')
    } else {
      this.setState({
        isLoading: true,
      })
      auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
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
          title="Login"
          onPress={()=>this.handleLogin()}
        />   
        <Button
          color="#F2545B"
          title="Cancel"
          onPress={()=>this.goHome()}
        />  
        <Text 
          style={styles.register}
          onPress={() => this.props.navigation.navigate('Register')}>
          Don't have account? Click here to signup
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
    backgroundColor: "#F5FCFF"
  },
  textInput: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#2BC3D5",
    borderBottomWidth: 1
  },
  register: {
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