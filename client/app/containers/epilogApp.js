import React, {
  AsyncStorage,
  StyleSheet,
  Component,
  Text,
  View,
  Dimension,
  NativeModules
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Home from '../components/home';
import CameraView from '../components/camera';
import Capture from '../components/capture';
import Library from '../components/library';
import Story from '../components/story';
import NewStory from '../components/newStory';
import EditMoment from '../components/editMoment';
import LogIn from '../components/logIn';
import SignUp from '../components/signUp';
import LogOut from '../components/logOut';
//import LogInFail from '../components/logInFail';
//router for the app
class EpiLogApp extends Component {

  render() {
    // Be explicit about what is available as props
    const {
      viewControlState,
      viewControlActions,
      storiesState,
      storiesActions,
      authState,
      authActions,

    } = this.props;

    switch (viewControlState.currentView) {
      case "CAMERAVIEW":
        return (
          <CameraView
          onTakePicture={ () => {viewControlActions.setView('CAPTURE')}}
          />
          );
      case "HOME":
        return (
          <Home
          onCamera={ () => {viewControlActions.setView('CAMERAVIEW') }}
          onLogOut={ () => {viewControlActions.setView('LOGOUT') }}
          />);
      case "LOGIN":
        return (
          <LogIn
          successLoggedIn={ () => { viewControlActions.setView('HOME') }}
          onSignUp={ () => { viewControlActions.setView('SIGNUP') }}
          />);

      case "SIGNUP":
        return (
          <SignUp
          successSignedUp={ () => { viewControlActions.setView('HOME') }}
          onLogIn={ () => { viewControlActions.setView('LOGIN') }}
          />);
      case "LOGOUT":
        return (
          <LogOut
          successLoggedOut={ () => { viewControlActions.setView('LOGIN') }}
          />);
      case "LIBRARY":
        return (
          <Library
          stories={storiesState}
          onLoad={storiesActions.fetchStories}
          onTouchImage={ (asset) =>{ viewControlActions.setView('STORY', { asset: asset }) }}
          />);
      case "STORY":
        return (
          <Story
          asset={viewControlState.passedProps.asset}
          onBack={ () => { viewControlActions.setView('LIBRARY') }}
          />);
      case "NEW_STORY":
        return (
          <NewStory
          asset={viewControlState.passedProps.asset}
          storyTitle={viewControlState.passedProps.storyTitle}
          onBack={()=>{viewControlActions.setView('CAPTURE')}}
          onSubmit={(redirect)=>{
            console.log('Reached');
            viewControlActions.setView('LIBRARY');
          }}
          />
        );
      case "CAPTURE":
        return (
          <Capture
          onTouchImage={ (asset) => { viewControlActions.setView('EDIT_MOMENT', { asset: asset }); }}
          />);
      case "EDIT_MOMENT":
        return(<EditMoment
          asset={viewControlState.passedProps.asset}
          onCancel={()=>{viewControlActions.setView('CAPTURE')}}
          onSubmit={(redirect, asset)=>{
              if (redirect === 'HOME') {
                viewControlActions.setView('HOME', {});
              } 
              
              viewControlActions.setView('NEW_STORY', { asset: asset });
            }
          }
        />);
      default:
        return <LogIn />;
    }
  }
}

export default connect(state => ({
    viewControlState: state.viewControl,
    storiesState: state.stories,
    authState: state.authControl,
    Urls:state.Urls, // where the various url's are
  }),
  (dispatch) => ({
    viewControlActions: bindActionCreators(actions.viewControlActions, dispatch),
    storiesActions: bindActionCreators(actions.storiesActions, dispatch),
    authActions: bindActionCreators(actions.authActions, dispatch),
    thunkFetch: bindActionCreators(actions.thunkFetch, dispatch),
  })
)(EpiLogApp);

