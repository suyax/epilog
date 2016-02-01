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
    this.setState({
      firstname,
      lastname,
      email,
      password
    })
    this.fetchUser();
    console.log('signup form', this.state)
  }

  saveToken(token) {
    console.log('saveToken;',token)
    AsyncStorage.setItem(STORAGE_KEY, token).then(
      console.log('save token to disk: ' + token)
      ).done();
  }

  fetchUser() {
    const { successSignedUp } = this.props
    //for testing purpose should be remove when database complete
    //successSignedUp();
    fetch('http://127.0.0.1:3000/api/signup', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => {response.json()})
    .then((responseData) => {
      console.log('get response data:', responseData)
      this.saveToken(responseData.token);
      successSignedUp();
    })
    .catch((error)=> {
      console.log(error.message)
    })
  }

  render() {
    const {onLogIn} = this.props;
    return (
      <View style={{flex:1, backgroundColor:'#6A85B1'}} >
      <View style={{flex:5}}>
      </View>
      <View style={{flex: 5}}>
        <Text style={styles.buttonText}>
        SignUp
        </Text>
      <TextInput
        ref="firstname"
        placeholder={'First Name'}
        style={styles.input}
        onChangeText={(text) => this.fields.firstname = text}
        onSubmitEditing={() => this.refs.lastname.focus()}
        />

      <TextInput
        ref="lasttname"
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
        <Text>Register</Text>
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

module.exports = SignUp;
