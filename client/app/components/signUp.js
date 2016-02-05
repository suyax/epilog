import React, {
  AsyncStorage,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  AlertIOS
} from 'react-native';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

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
    }
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
    fetch('http://127.0.0.1:3000/api/users', {
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
      <View style={styles.container}>
        <View style={styles.positionBox}>
        </View>
        <View style={styles.positionBox}>
          <Text style={styles.title}>
          Sign Up
          </Text>
          <TextInput
            ref='firstname'
            autoCapitalize={'none'}
            placeholder={'FIRST NAME'}
            style={[styles.input, styles.wrapper]}
            onChangeText={(text) => this.fields.firstname = text}
            onSubmitEditing={() => {
              dismissKeyboard()
              this.refs.lastname.focus()
            }}
            />

          <TextInput
            ref="lastname"
            autoCapitalize={'none'}
            placeholder={'LAST NAME'}
            style={[styles.input, styles.wrapper]}
            onChangeText={(text) => this.fields.lastname = text}
            onSubmitEditing={() => {
              this.refs.email.focus()
              dismissKeyboard()
            }}
            />

          <TextInput
            ref="email"
            autoCapitalize={'none'}
            placeholder={'EMAIL'}
            style={[styles.input, styles.wrapper]}
            keyboardType={'email-address'}
            onChangeText={(text) => this.fields.email = text}
            onSubmitEditing={() => {
              this.refs.password.focus()
              dismissKeyboard()
            }}
            />

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
            />
        </View>

        <View style={styles.Container}>
        <View style={styles.textContainer}>
          <TouchableHighlight
          style={styles.button}
          onPress={this._submitForm.bind(this)}>
            <Text style={styles.buttonText} >Register
            </Text>
          </TouchableHighlight>
        </View>
          <Text style={styles.text}>
          Alreay have an account?
          </Text>
          <View style={styles.textContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={onLogIn}>
            <View>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableHighlight>
          </View>
        </View>
      </View>
    );
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

module.exports = SignUp;
