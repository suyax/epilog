import React, {
  StyleSheet,
  Component,
  Text,
  View,
  Dimension
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';



import * as viewControlActions from '../actions/viewControlActions';
import Home from '../components/home';
import Capture from '../components/capture';
import Library from '../components/library';
import Story from '../components/story';
import EditMoment from '../components/editMoment';
//router for the app
class EpiLogApp extends Component {
  render() {
    const { viewControlState, viewControlActions } = this.props;
    switch (viewControlState.currentView) {
      case "HOME":
        return <Home />;
      case "LIBRARY":
        return (
          <Library
          onTouchImage={
            asset =>{
              console.log("onTouch get asset", asset);
              viewControlActions.setView('STORY', {
                asset: asset
              })
            }}
            />
          );
      case "STORY":
        return (
          <Story
          asset={viewControlState.passedProps.asset}
          onBack={()=>{viewControlActions.setView('LIBRARY')}}
          />);
      case "CAPTURE":
        return (
          <Capture
          onTouchImage={
            (asset)=>{
              viewControlActions.setView('EDIT_MOMENT', {
                asset: asset
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

