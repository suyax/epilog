import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import NavBar from './navBar';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.navOption}>
        Home Page !
        </Text>
        <NavBar />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  navOption: {
    fontSize: 20,
    color: 'red',
    marginTop: 10
  },
});

module.exports = Home;

