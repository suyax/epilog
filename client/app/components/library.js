import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import NavBar from './navBar';

class Library extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Library Page !
          </Text>
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
  },
  content: {
    flex: 11,
    justifyContent: 'center',
    backgroundColor: 'yellow',
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

module.exports = Library;
