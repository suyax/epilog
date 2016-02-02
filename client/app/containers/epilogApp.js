import React, {
  StyleSheet,
  Component,
  Text,
  View,
  Dimension,
  AsyncStorage
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Home from '../components/home';
import Capture from '../components/capture';
import Library from '../components/library';
import Story from '../components/story';
import NewStory from '../components/newStory';
import EditMoment from '../components/editMoment';
import LogIn from '../components/logIn';
import SignUp from '../components/signUp';
import LogOut from '../components/logOut';

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
      case "HOME":
        return (
          <Home 
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
          onBack={()=>{viewControlActions.setView('EDIT_MOMENT')}}
          />);
      case "CAPTURE":
        return (
          <Capture
          onTouchImage={ (asset) => { viewControlActions.setView('EDIT_MOMENT', { asset: asset }); }} 
          />);
      case "EDIT_MOMENT":
        return(<EditMoment
          asset={viewControlState.passedProps.asset}
          onCancel={()=>{viewControlActions.setView('CAPTURE')}}
          onTouchImage={ (asset) => { viewControlActions.setView('NEW_STORY', { asset: asset }); }}
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

