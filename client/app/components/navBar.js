
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as viewControlActions from '../actions/viewControlActions';

class NavBar extends Component {
  render() {
    const { currentView, viewActions } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={()=> viewActions.setView("HOME")}underlayColor="orange">
          <Text style={styles.navOption}>
          Home
          </Text>
        </TouchableHighlight>
        <View style={styles.cameraIcon}>
          <TouchableHighlight onPress={()=> viewActions.setView("CAMERAVIEW")}underlayColor="orange">
            <Image style={styles.icon} source={require('../image/gray-camera-icon.png')}/>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={()=> viewActions.setView("LIBRARY")}underlayColor="orange">
          <Text style={styles.navOption}>
          Library
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#957a78',
  },
  navOption: {
    textAlign: 'center',
    flex: 0.65,
    fontSize: 20,
    color: '#e4e4e4',
    width: 140,
    marginTop: 19,
  },
  icon: {
    alignSelf: 'center',
    height: 50,
    width: 50,
  },
  cameraIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 0.65,
    flexDirection: 'column',
    width: 140,
  },
});

export default connect(state => ({
  currentView: state.viewControl.currentView
}),
(dispatch) => ({
  viewActions: bindActionCreators(viewControlActions, dispatch )
}))(NavBar);

