import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView,
  Navigator,
  Image,
  AsyncStorage
} from 'react-native';

import Login from './Login'
import Separator from './Helpers/Separator'
import Post from './Post'

var url = `https://afternoon-badlands-40242.herokuapp.com/users`

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      user_id: '',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value === null) {
        this.props.navigator.resetTo({
          component: Login,
          name: 'Login',
          passProps: {
            message: "You must be logged in to view your profile.",
          }
        })
      } else {
        this.setState({'user_id': value});
        this.fetchData(value);
      }
    }).done();
  }

  fetchData(user_id) {
    fetch(`https://afternoon-badlands-40242.herokuapp.com/users/${user_id}`)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.response === "No posts for this user" ){
          this.setState({
            username: responseData.username,
            dataSource: responseData.response,
            loaded: true
          })
        } else {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
            username: responseData.username,
            loaded: true
          });
        }
      })
      .done();
  }

  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else if (this.state.dataSource === "No posts for this user"){
      return(
        <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
          <View style={styles.content}>
            <Text style={styles.text}> You do not have any posts </Text>
          </View>
        </Image>
      )
    } else {
      return(
          <Image source={require('./../../imgs/gradient3.jpg')} style={styles.backgroundImage}>
          <ScrollView style={styles.content}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPostView.bind(this)}
            style={styles.listView}
          />
          </ScrollView>
        </Image>
      );
    }
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          animating={!this.state.loaded}
          color="#111"
          size="large"></ActivityIndicatorIOS>
      </View>
    );
  }

  _onDeleteButton(post){
    console.log(this)
    console.log(post)
    fetch(`https://afternoon-badlands-40242.herokuapp.com/schools/${post.school_id}/posts/${post.id}`, {
      method: 'delete',
      headers: {
        'Access-Control-Allow-Methods': 'DELETE',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        school_id: post.school_id,
        id: post.id
      })
    })
    .then((responseText) => responseText.json())
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => {
      console.warn(error);
    })
  }

  _onPostButton (post) {
    console.log(post)
    this.props.navigator.push({
      component: Post,
      name: "Post",
      passProps: {
        schoolId: post.school_id,
        postTitle: post.title,
        postId: post.id,
        postBody: post.body
      },
    });
  }

  renderPostView(post){
    return (
      <View style={styles.container}>
        <TouchableOpacity
          sytle={styles.rowContainer}
          onPress={(this._onPostButton.bind(this, post))}
          underlayColor="white">
          <Text style={styles.textResource}>{post.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this._onDeleteButton.bind(this, post)}>
          <Text style={styles.delete}>DELETE</Text>
        </TouchableOpacity>
        <Separator/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    width: 400,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  rowContainer: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  delete: {
    width: 50,
    textAlign: 'right',
    color: '#fff',
    fontSize: 12,
  },
  content:{
    marginTop: 90,
    backgroundColor: 'transparent',
  },
  listView: {
    paddingTop: 1,
    backgroundColor: 'transparent',
  },
  text: {
    paddingLeft: 12,
    fontFamily: 'Apple SD Gothic Neo',
    color: '#FFF',
    fontSize: 16,
  },
  textResource:{
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

module.exports = Profile;
