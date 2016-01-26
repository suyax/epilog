import React, {
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import * as viewControlActions from '../actions/viewControlActions';
import Home from '../components/home';
import Capture from '../components/capture';
import Library from '../components/library';
//router for the app
class EpiLogApp extends Component {
  render() {
    const { currentView } = this.props;
    switch (currentView) {
      case "HOME":
        return <Home />;
      case "LIBRARY":
        return <Library />;
      case "CAPTURE":
        return <Capture />;
      default:
        return <Library />;
    }
  }
}

/*var styles = StyleSheet.create({
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
});*/

/*export default connect(state => ({
  currentView: state.viewControl.currentView
}),
(dispatch) => ({
  setView: bindActionCreators(, s)
})
)*/


module.exports = EpiLogApp;

