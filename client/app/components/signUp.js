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

var STORAGE_KEY = "token"

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
    }

    this.state = {
      ...this.fields,
      visibleHeight: Dimensions.get('window').height
    }
  }
  componentWillMount () {
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
  }
  _submitForm () {
    const { firstname, lastname, email, password } = this.fields
    this.fetchSignUp(firstname, lastname, email, password);
    //console.log('signup form', this.state)
  }

  saveToken(token) {
    //console.log('saveToken;',token)
    return AsyncStorage.setItem(STORAGE_KEY, token)
    .then(
      //console.log('save token to disk: ' + token)
      ).done();
  }

  failSignUp () {
    const { firstname, lastname, email, password } = this.fields
    AlertIOS.alert(
     'Sorry Dear '+ firstname + '  ' + lastname ,
     'This Email has been registered, Please try another one.'
    )
  }

  fetchSignUp(firstname, lastname, email, password) {
    const { successSignedUp } = this.props
    //for testing purpose should be remove when database complete
    //successSignedUp();
    fetch(SERVER_URL + '/api/users', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password
      })
    })
    .then((response) => {
      //console.log(response)
      return response.json()})
    .then((responseData) => {
      //console.log ('get response data:', responseData)
      return this.saveToken(responseData.token)})
    .then(() => {
      successSignedUp();
    })
    .catch((error)=> {
      this.failSignUp();
    })
  }

  render() {
    const { onLogIn } = this.props;
    return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[externalStyles.viewBody,
          {height: this.state.visibleHeight, justifyContent: 'flex-end'} ]}>
          <View style={styles.positionBox}>
            <Text style={styles.title}>Sign Up</Text>
            
            <View style={externalStyles.textContainer}>
              <TextInput
                ref='firstname'
                autoCapitalize={'none'}
                placeholder={'FIRST NAME'}
                onChangeText={(text) => this.fields.firstname = text}
                onSubmitEditing={() => {
                  dismissKeyboard()
                  this.refs.lastname.focus()
                }}
                style={[externalStyles.textInput, styles.textInput]}
                placeholderTextColor='#000000'
                />
            </View>
              
            <View style={externalStyles.textContainer}>
              <TextInput
                ref="lastname"
                autoCapitalize={'none'}
                placeholder={'LAST NAME'}
                onChangeText={(text) => this.fields.lastname = text}
                onSubmitEditing={() => {
                  this.refs.email.focus()
                  dismissKeyboard()
                }}
                style={[externalStyles.textInput, styles.textInput]}
                placeholderTextColor='#000000'
                />
            </View>

            <View style={externalStyles.textContainer}>
              <TextInput
                ref="email"
                autoCapitalize={'none'}
                placeholder={'EMAIL'}
                keyboardType={'email-address'}
                onChangeText={(text) => this.fields.email = text}
                onSubmitEditing={() => {
                  this.refs.password.focus()
                  dismissKeyboard()
                }}
                style={[externalStyles.textInput, styles.textInput]}
                placeholderTextColor='#000000'
                />
            </View>

            <View style={externalStyles.textContainer}>
              <TextInput
                ref="password"
                autoCapitalize={'none'}
                placeholder={'PASSWORD'}
                maxLength ={20}
                style={[styles.input, styles.wrapper]}
                onChangeText={(text) => this.fields.password = text}
                onSubmitEditing={() => {
                  this._submitForm
                  dismissKeyboard()
                }}
                style={[externalStyles.textInput, styles.textInput]}
                placeholderTextColor='#000000'
                />
            </View>
          </View>
          <View style={styles.Container}>
            <View style={[externalStyles.buttonContainer, styles.buttonContainer]}>
              <TouchableHighlight onPress={this._submitForm.bind(this)}>
                <Text style={externalStyles.button} >Register</Text>
              </TouchableHighlight>
            </View>
            <View>
              <Text style={styles.text}>
                Alreay have an account?
              </Text>
            </View>
            <View style={[externalStyles.buttonContainer, styles.buttonContainer]}>
              <TouchableHighlight onPress={onLogIn}>
                <Text style={externalStyles.button}>Login</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

var styles = StyleSheet.create({
  container: {
  },
  positionBox: {
  },
  textInput: {
    color: ' #000000'
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

module.exports = SignUp;
