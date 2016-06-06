import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

import Post from "./Post"

class Community extends Component {

  _onPostButton(){
    this.props.navigator.push({
      component: Post,
      name: "Post"
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text> Community </Text>
        <TouchableHighlight style={styles.button} onPress={this._onPostButton.bind(this)}>
          <Text style={styles.buttonText}> New Post </Text>
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
  button: {
    height: 45,
    flexDirection: 'column',
    backgroundColor: '#E74C3C',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = Community;