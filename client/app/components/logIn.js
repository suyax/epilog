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

    this.state = {
      username: undefined,
      password: undefined
    }
  }

  buttonClicked() {
      console.log('button clicked');
  }

  render() {
    const {asset, onSignUp} = this.props;
    return (
      <View style={{flex:1, backgroundColor:'#6A85B1'}} >
      <View style={styles.navBar}>
        <NavBar />
      </View>
      <View style={{flex:10}}>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.buttonText}>
        Login
        </Text>
      </View>
      <TextInput
        autoFocus={true}
        placeholder={'username'}
        style={styles.input}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        />
      <TextInput
          style={styles.input}
          placeholder={'password'}
          value={this.state.password}
          secureTextEntry={true}
          onSubmitEditing={(password) => this.setState({password})}
        />
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
