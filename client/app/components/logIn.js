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
  TouchableWithoutFeedback,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';

import {SERVER_URL} from '../urls';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import externalStyles from '../style/external-styles.js';

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
      visibleHeight: Dimensions.get('window').height
    }
  }

  componentWillMount () {
    console.log('Login will mount: ',DeviceEventEmitter);
    DeviceEventEmitter.addListener('keyboardWillShow', (e)=>{
      let newSize = Dimensions.get('window').height - e.endCoordinates.height
      this.setState({visibleHeight: newSize})
    });
    DeviceEventEmitter.addListener('keyboardWillHide', (e)=>{
      this.setState({visibleHeight: Dimensions.get('window').height})
    });
  }

  componentWillUnmount(){
    DeviceEventEmitter.removeAllListeners('keyboardWillShow');
    DeviceEventEmitter.removeAllListeners('keyboardWillHide');
    console.log('Login will unmount: ',DeviceEventEmitter);
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
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[externalStyles.viewBody,
          {height: this.state.visibleHeight, justifyContent: 'flex-end'} ]}>
          <View style={styles.positionBox}>
            <Text style={styles.title}>Login</Text>
            <View style={externalStyles.textContainer}>
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
                style={[externalStyles.textInput, styles.textInput]}
                placeholderTextColor='#000000'
                />
            </View>
            <View style={externalStyles.textContainer}>
              <TextInput
                ref='password'
                autoCapitalize={'none'}
                placeholder={'PASSWORD'}
                secureTextEntry={true}
                onChangeText={text => this.fields.password = text}
                onSubmitEditing={() => dismissKeyboard()}
                style={[externalStyles.textInput, styles.textInput]}
                placeholderTextColor='#000000'
                />
            </View>
          </View>
          <View style={styles.Container}>
            <View style={[externalStyles.buttonContainer, styles.buttonContainer]}>
              <TouchableHighlight onPress={this._submitForm.bind(this)}>
                <Text style={externalStyles.button}>Submit</Text>
              </TouchableHighlight>
            </View>
            <Text style={styles.text}>
              Don't have an account?
            </Text>
            <View style={[externalStyles.buttonContainer, styles.buttonContainer]}>
              <TouchableHighlight onPress={onSignUp}>
                <Text style={externalStyles.button}>Sign Up</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

var styles = StyleSheet.create({
  container: {
  },
  positionBox: {
  },
  textInput: {
    color: '#000000'
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
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
