import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import NavBar from './navBar';

class Home extends Component {
  render() {
    const {onLogOut, onCamera} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
        <View style={styles.positionBox}>
          <Text style={styles.title}>
            Home Page !
          </Text>
          </View>
        <TouchableHighlight
          style={styles.navBar}
          onPress={onCamera}>
            <Image
              style={styles.icon}
              source={require('../image/CameraIcon.png')}/>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navBar}
          onPress={onLogOut}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </View>
        </TouchableHighlight>
        </View>
        <View style={styles.navBar}>
          <NavBar />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor:'#92A8D1',
  },
  content: {
    flex: 11,
    justifyContent: 'center',
  },
  navBar: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: ' #2C3539'
  },
  icon: {
    width: 50,
    height: 50,
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: 100,
    backgroundColor: 'white',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
  },
  positionBox: {
    flex: 5
  },
});

module.exports = Home;

