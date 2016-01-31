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
      console.log('logoutFetch works')
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  destoryToken(token) {
    console.log('destoryToken;',token)
    AsyncStorage.removeItem(STORAGE_KEY)
    .then(
      console.log('token removed from disk')
      ).done()
  }

  fetchUser() {
    const { successLoggedOut } = this.props
    console.log('LogoutFetch token'. token)
    fetch('http://127.0.0.1:3000/api/signout', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: this.state.token,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('get response data:', responseData);
        this.destoryToken();
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
