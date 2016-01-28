import React, {
  StyleSheet,
  Component,
  Text,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';



import * as viewControlActions from '../actions/viewControlActions';
import Home from '../components/home';
import Capture from '../components/capture';
import Library from '../components/library';
import EditMoment from '../components/editMoment';
//router for the app
class EpiLogApp extends Component {
  render() {
    const { viewControlState, viewControlActions } = this.props;
    switch (viewControlState.currentView) {
      case "HOME":
        return <Home />;
      case "LIBRARY":
        return <Library />;
      case "CAPTURE":
        return (
          <Capture 
          onTouchImage={
            (asset)=>{
              viewControlActions.setView('EDIT_MOMENT', {
                asset:asset
              });
            }}
          />
        );
      case "EDIT_MOMENT":
        return(<EditMoment 
          asset={viewControlState.passedProps.asset} 
          onCancel={()=>{viewControlActions.setView('CAPTURE')}}
          />);
      default:
        return <Home />;
    }
  }
}

export default connect(state => ({
    viewControlState: state.viewControl,
  }),
  (dispatch) => ({
    viewControlActions: bindActionCreators(actions.viewControlActions, dispatch),
  })
)(EpiLogApp);

