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
import externalStyles from '../style/external-styles.js';
var STORAGE_KEY = 'token';

class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  goHome() {
    const { successGotHome } = this.props
    successGotHome();
  }

  destoryToken() {
    //console.log('destoryToken;',STORAGE_KEY)
    const { successLoggedOut }=this.props
    AsyncStorage.removeItem(STORAGE_KEY)
    .then(
      AsyncStorage.getItem(STORAGE_KEY))
    .then((result) => {
      if (!result){
      //console.log('key has been destroyed')
      }
    })
    .then(()=>{ successLoggedOut()})
    .done();
  }

  render() {
    return (
      <View style={externalStyles.viewBody}>
        <View style={styles.positionBox}>
        </View>
        <View style={styles.positionBox}>
          <Text style={styles.text}>
          Are you sure you want to log out?
          </Text>
          <View style={externalStyles.buttonContainer}>
          <TouchableHighlight
          onPress={this.destoryToken.bind(this)}>
          <View>
            <Text style={externalStyles.button}>LogOut</Text>
          </View>
          </TouchableHighlight>
          <TouchableHighlight
          onPress={this.goHome.bind(this)}>
          <View>
            <Text style={externalStyles.button}>Stay</Text>
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
    flex: 1,
    backgroundColor:'#92A8D1',
  },
  positionBox: {
    flex: 2,
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
