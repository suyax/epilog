import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  AlertIOS
} from 'react-native';

import NavBar from './navBar';

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
    console.log('form works', this.fields)
    this.setState({
      username,
      password
    })

  }

  render() {
    const {asset, onSignUp} = this.props;
    return (
      <View style={{flex:1, backgroundColor:'#6A85B1'}} >
        <View style={styles.navBar}>
          <NavBar />
        </View>
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
  navBar:{
    flex:1,
  },
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
