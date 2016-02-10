'use strict'

import React, {
  AsyncStorage,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  AlertIOS,
} from 'react-native';

import {SERVER_URL} from '../urls';
import NavBar from './navBar';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

var STORAGE_KEY = 'token';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      email: null,
      password: null,
    }

    this.state = {
      ...this.fields,
    }
  }

  _submitForm () {
    const { email, password } = this.fields
    this.fetchLogIn(email, password)
    //console.log ('login form', this.state)
  }

  saveToken(token) {
    //console.log('saveToken;',token)
    return AsyncStorage.setItem(STORAGE_KEY, token)
    .then(
      //console.log('save token to disk: ' + token)
      ).done()
  }

  failLoggedIn () {
    AlertIOS.alert(
     'Sorry Email / Password not match our record',
     'Please try it again.'
    );
  }

  fetchLogIn(email, password) {
    const { successLoggedIn } = this.props
    //for testing purpose should be remove when database complete
    //successLoggedIn();
    //console.log('fetch email' ,this.state.email ,'fetch password', this.state.password)
    fetch(SERVER_URL + '/api/users/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    })
      .then((response) => {
        //console.log(response)
        return response.json()})
      .then((responseData) => {
        //console.log ('get response data:', responseData.token)
        return this.saveToken(responseData.token)})
      .then(() => {
        //console.log('successLoggedIn')
        successLoggedIn();
      })
      .catch((error)=> {
        this.failLoggedIn();
      })
  }

  render() {
    const { onSignUp } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.positionBox}>
        </View>
          <View style={styles.positionBox}>
            <Text style={styles.title}>
            Login
            </Text>
          <TextInput
            ref="email"
            autoCapitalize={'none'}
            placeholder={'EMAIL'}
            keyboardType={'email-address'}
            onChangeText={text => this.fields.email = text}
            onSubmitEditing={() => {
              dismissKeyboard()
              this.refs.password.focus()
              }}
            style={[styles.input, styles.wrapper]}
            />

          <TextInput
              ref='password'
              autoCapitalize={'none'}
              placeholder={'PASSWORD'}
              secureTextEntry={true}
              onChangeText={text => this.fields.password = text}
              onSubmitEditing={() => dismissKeyboard()}
              style={[styles.input, styles.wrapper]}
            />
      </View>
      <View style={styles.Container}>
      <View style={styles.textContainer}>
          <TouchableHighlight
          style={styles.button}
          onPress={this._submitForm.bind(this)}>
            <Text style={styles.buttonText}>Submit
            </Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.text}>
        Don't have an account?
        </Text>
        <View style={styles.textContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={onSignUp}>
          <View>
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
        </TouchableHighlight>
        </View>
      </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#92A8D1',
  },
  positionBox: {
    flex: 5
  },
  input: {
    height: 40,
    backgroundColor:'white',
    borderColor: 'gray',
    borderWidth: 2,
    textAlign: 'center',
    margin: 5,
    color: ' #2C3539'
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: 100,
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
    marginBottom: 8,
    alignItems: 'center',
  },
  text:{
    textAlign: 'center',
    color: ' #2C3539'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

module.exports = LogIn;
