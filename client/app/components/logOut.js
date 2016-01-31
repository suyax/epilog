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

import NavBar from './navBar';
var STORAGE_KEY = 'token';

class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }
  _submitForm () {
    const { username, password } = this.fields
    this.setState({
      username,
      password,
    })
    this.fetchUser();
    console.log('form works', this.state)
  }

  saveToken(token) {
    console.log('saveToken;',token)
    AsyncStorage.setItem(STORAGE_KEY, token).then(
      console.log('save token to disk: ' + token)
      ).done();
  }

  fetchUser() {
    const { successLoggedIn } = this.props
    console.log('fetch username',this.state.username,'fetch password', this.state.password)
    fetch('http://127.0.0.1:3000/api/signin', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: this.state.username,
        secondParam: this.state.password,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('get response data:', responseData.token);
        this.saveToken(responseData.token);
        successLoggedIn();
      })
      .catch((error)=> {
        console.log(error);
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
          Log Out
          </Text>
          <View style={styles.button}>
          <TouchableHighlight onPress={this._submitForm.bind(this)}>
            <Text style={styles.buttonText}>LogOut</Text>
          </TouchableHighlight>
          </View>
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

module.exports = LogOut;
