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

  goHome() {
    const { successGotHome } = this.props
    successGotHome();
  }

  LogOutRequest() {
    //const { successLoggedOut } = this.props
    //for testing purpose should be remove when database complete
    //successLoggedOut();
    AsyncStorage.getItem(STORAGE_KEY)
    .then((value) => {
      this.fetchLogOut(value);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  destoryToken(STORAGE_KEY) {
    //console.log('destoryToken;',STORAGE_KEY)
    AsyncStorage.removeItem(STORAGE_KEY)
    .then(
      AsyncStorage.getItem(STORAGE_KEY))
    .then((result) => {
      if (!result){
      //console.log('key has been destroyed')
      }
    }).done();
  }

  fetchLogOut(value) {
    const { successLoggedOut } = this.props
    //console.log('LogoutFetch token', value)
    fetch('http://127.0.0.1:3000/api/users/logout', {
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': value
      }
    })
    .then((response) => {
      //console.log (response)
      return response.json()})
    .then((responseData) => {
      //console.log ('get response data:', responseData)
      this.destoryToken(STORAGE_KEY)
      successLoggedOut()
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.positionBox}>
        </View>
        <View style={styles.positionBox}>
          <Text style={styles.text}>
          Are you sure you want to log out?
          </Text>
          <View style={styles.textContainer}>
          <TouchableHighlight
          style={styles.button}
          onPress={this.LogOutRequest.bind(this)}>
          <View>
            <Text style={styles.buttonText}>LogOut</Text>
          </View>
          </TouchableHighlight>
          <TouchableHighlight
          style={styles.button}
          onPress={this.goHome.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Stay</Text>
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
    margin: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
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

module.exports = LogOut;
