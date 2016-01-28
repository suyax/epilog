import React, {
  Component,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import NavBar from './navBar';

class Story extends Component {

  render() {
    const {asset} = this.props;
    var moment = asset.moments[0];
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            story Page !
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
    backgroundColor: 'green',
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

module.exports = Story
