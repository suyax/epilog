import React, {
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

    this.state = {
      user: undefined,
      password: undefined
    }
  }

  buttonClicked() {
      console.log('button clicked');
  }

  render() {
    const {asset, login} = this.props;
    return (
      <View style={{flex:1, backgroundColor:'#6A85B1'}} >
      <View style={{flex:11}}>
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
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
      <TextInput
          style={styles.input}
          placeholder={'password'}
          value={this.state.text}
          secureTextEntry={true}
          onSubmitEditing={(text) => this.setState({text})}
        />
      <View style={styles.button}>
        <Text style={styles.buttonText}>
        Alreay have an account?
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={login}>
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
