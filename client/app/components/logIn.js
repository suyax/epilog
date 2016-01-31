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

var STORAGE_KEY = 'token';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      username: null,
      password: null,
    }

    this.state = {
      ...this.fields,
    }
  }

  _submitForm () {
    const { username, password } = this.fields
    this.setState({
      username,
      password,
    })
    this.fetchUser();
    console.log('login form', this.state)
  }

  saveToken(token) {
    console.log('saveToken;',token)
    AsyncStorage.setItem(STORAGE_KEY, token).then(
      console.log('save token to disk: ' + token)
      ).done();
  }

  fetchUser() {
    const { successLoggedIn } = this.props
    //for testing purpose should be remove when database complete
    successLoggedIn();
    console.log('fetch username',this.state.username,'fetch password', this.state.password)
    fetch('http://127.0.0.1:3000/api/signin', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
      .then((response) => {response.json()})
      .then((responseData) => {
        console.log('get response data:', responseData.token)
        this.saveToken(responseData.token);
        successLoggedIn();
      })
      .catch((error)=> {
        console.log(error.message)
      })
  }

  render() {
    const { onSignUp } = this.props;
    return (
      <View style={{flex:1, backgroundColor:'#6A85B1'}} >
        <View style={{flex:5}}>
        </View>
        <View style={{flex: 5}}>
          <Text style={styles.buttonText}>
          Login
          </Text>
          <TextInput
            ref="username"
            placeholder={'username'}
            value={this.state.username}
            onChangeText={text => this.fields.username = text}
            onSubmitEditing={() => this.refs.password.focus()}
            style={styles.input}
            />

          <TextInput
              ref="password"
              placeholder={'password'}
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={text => this.fields.password = text}
              onSubmitEditing={this._submitForm}
              style={styles.input}
            />

          <TouchableHighlight onPress={this._submitForm.bind(this)}>
            <Text>Submit</Text>
          </TouchableHighlight>
        </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>
        Don't have an account?
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={onSignUp}>
          <View>
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
        </TouchableHighlight>
      </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  input:{
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

module.exports = LogIn;
