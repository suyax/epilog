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

  LogOutRequest () {
    const { successLoggedOut } = this.props
    //for testing purpose should be remove when database complete
    successLoggedOut();
    AsyncStorage.getItem(STORAGE_KEY)
    .then( (value) => {
      this.fetchUser(value);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

/*  async saveToken() {
    var token = 'test'
    console.log('saveToken;',token)
    AsyncStorage.setItem(STORAGE_KEY, token)
    .then(
      console.log('save token to disk: ' + token)
      )
    .done();
  }*/

  destoryToken(STORAGE_KEY) {
    console.log('destoryToken;',STORAGE_KEY)
    AsyncStorage.removeItem(STORAGE_KEY)
    .then(
      AsyncStorage.getItem(STORAGE_KEY))
    .then((result)=>{
      if (!result){
      console.log('key has been destroyed')
    }
  }).done();
  }

  fetchUser(value) {
    const { successLoggedOut } = this.props
    console.log('LogoutFetch token', value)
    fetch('http://127.0.0.1:3000/api/logout', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: value,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('get response data:', responseData);
        successLoggedOut();
      }).then(() => {
        this.destoryToken()
      })
      .catch((error)=> {
        console.log(error);
      })
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#6A85B1'}} >
        <View style={{flex:5}}>
        </View>
        <View style={{flex: 5}}>
          <Text style={styles.buttonText}>
          Are you sure you want to log out?
          </Text>
          <View style={styles.button}>
          <TouchableHighlight onPress={this.LogOutRequest.bind(this)}>
            <Text style={styles.buttonText}>LogOut</Text>
          </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({

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
