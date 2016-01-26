
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class NavBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.navOption}>
        box1
        </Text>
        <Text style={styles.navOption}>
        box2
        </Text>
        <Text style={styles.navOption}>
        box3
        </Text>
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

module.exports = NavBar;

