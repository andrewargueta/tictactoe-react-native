import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'


import AppIntroSlider from 'react-native-app-intro-slider';


export default class Test extends Component {
  
  constructor() {
    super()
    this.state={ gameStarted: false }
  }
  
  /** Goes to corresponding page */
  goTo(link) {
    this.props.navigation.navigate(link);
  }

  /** Renders the welcome page  */
  renderItem = ({ item }) => {
    return (
      <View>
        <View style={[styles.slide, {height: Dimensions.get('window').height + 'px'}]}>
        <Image style={{width:"50%", height:"25%"}}source = {item.image}></Image>
          <Text style={styles.welcome}>{item.text}</Text>
        </View>
      </View>
    );
  }

  /** Renders the done button   */
  renderDoneButton = () => {
    return (
      <View>
        <Text stlye={{color:'grey'}}>Done</Text>
      </View>
    );
  };
  
  render() {
    return (
        <AppIntroSlider 
        renderItem={this.renderItem} 
        data={slides}
        renderDoneButton={this.renderDoneButton}
        onDone={()=>this.goTo('Register')}
        />
    )
  }
}
const slides = [
  {
    key: 1,
    title: 'Welcome',
    text: 'Welcome to Tic Tac Toe.io!\nThis app helps cognitive function, problem solving, and much more!\nYou will be playing Tic Tac Toe against an AI\nWe will keep track of your record',
    image: require('../assets/brand.png')
  }
];

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
  },
  slide:{
    backgroundColor:"#F5FCFF",
    height: Dimensions.get('window').height,
    justifyContent: "center", 
    alignItems:"center",
   

  }
})