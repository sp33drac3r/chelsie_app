import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

import Resource from "./Resource"
import ImmediateAssistance from "./ImmediateAssistance"

class Main extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  _onASAPButton(){
    this.props.navigator.push({
      component: ImmediateAssistance,
      name: "ImmediateAssistance"
    })
  }

  _onResourcesButton(){
    this.props.navigator.push({
      component: Resource,
      name: "Resource"
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this._onASAPButton.bind(this)}>
          <Text style={styles.buttonText}> Immediate Assistance </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onResourcesButton.bind(this)}>
          <Text style={styles.buttonText}>Resources</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
          <Text style={styles.buttonText}> Schools </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
          <Text style={styles.buttonText}> Login/Register </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = Main;
