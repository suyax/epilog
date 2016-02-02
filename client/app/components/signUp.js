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

  fetchSignUp(firstname, lastname, email, password) {
    const { successSignedUp } = this.props
    //for testing purpose should be remove when database complete
    //successSignedUp();
    fetch('http://127.0.0.1:3000/api/users/signup', {
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
      console.log(error.message)
    })
  }

  render() {
    const { onLogIn } = this.props;
    return (
      <View style={styles.container}>
      <View style={styles.positionBox}>
      </View>
      <View style={styles.positionBox}>
        <Text style={styles.buttonText}>
        SignUp
        </Text>
      <TextInput
        ref='firstname'
        placeholder={'First Name'}
        style={styles.input}
        onChangeText={(text) => this.fields.firstname = text}
        onSubmitEditing={() => this.refs.lastname.focus()}
        />

      <TextInput
        ref="lastname"
        placeholder={'Last Name'}
        style={styles.input}
        onChangeText={(text) => this.fields.lastname = text}
        onSubmitEditing={() => this.refs.email.focus()}
        />

      <TextInput
        ref="email"
        placeholder={'Email'}
        style={styles.input}
        onChangeText={(text) => this.fields.email = text}
        onSubmitEditing={() => this.refs.password.focus()}
        />

      <TextInput
        ref="password"
        placeholder={'password'}
        style={styles.input}
        onChangeText={(text) => this.fields.password = text}
        onSubmitEditing={() => this._submitForm}
        />

      <TouchableHighlight onPress={this._submitForm.bind(this)}>
        <Text style={styles.buttonText} >Register</Text>
      </TouchableHighlight>
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>
        Alreay have an account?
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={onLogIn}>
          <View>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableHighlight>
      </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#6A85B1'
  },
  positionBox: {
    flex: 5
  },
  input: {
    height: 40,
    backgroundColor:'white',
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center'
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
});

module.exports = SignUp;
