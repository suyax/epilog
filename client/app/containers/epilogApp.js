import React, {
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import NavBar from '../components/navBar';
import { connet } from 'react-redux';

class EpiLogApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.navOption}>
        HomePage
        </Text>
        <NavBar
        />
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
    flex: 1
  },
  navOption: {
    fontSize: 20,
    color: 'red',
  },
});

module.exports = EpiLogApp;

