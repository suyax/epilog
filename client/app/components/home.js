import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import NavBar from './navBar';


class Home extends Component {
  render() {
    const {onLogOut, onCamera} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Home Page !
          </Text>
        </View>
        <TouchableHighlight
          style={styles.navBar}
          onPress={onCamera}>
          <View>
            <Text style={styles.title}>Camera</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.navBar}
          onPress={onLogOut}>
          <View>
            <Text style={styles.title}>Log Out</Text>
          </View>
        </TouchableHighlight>
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
  },
  content: {
    flex: 11,
    justifyContent: 'center',
    backgroundColor:'#92A8D1',
  },
  navBar: {
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: ' #2C3539'
  },
});

module.exports = Home;

