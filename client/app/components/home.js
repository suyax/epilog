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
    const {onLogin} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Home Page !
          </Text>
        </View>
        <TouchableHighlight
          style={styles.navBar}
          onPress={onLogin}>
          <View>
            <Text style={styles.title}>Login</Text>
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
    backgroundColor: 'blue',
  },
  navBar: {
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red'
  },
});

module.exports = Home;

