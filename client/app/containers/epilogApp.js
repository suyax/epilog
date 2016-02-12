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
import {
Home,
CameraView,
Capture,
Library,
Story,
NewStory,
EditMoment,
LogIn,
SignUp,
LogOut,
Moment,
} from '../components';

//router for the app
class EpiLogApp extends Component {

  // This will only be run once
  componentWillMount () {
    const {storiesActions, tokenActions} = this.props;
    storiesActions.fetchStories();
    tokenActions.checkToken();
  }

  // This will be run everytime the props/state changes
  componentWillUpdate () {
    const {viewControlActions} = this.props;
    const {tokenState, viewControlState} = this.props;
    if(!tokenState.loading && tokenState.error){
      if(viewControlState.currentView !== 'LOGIN'){
        viewControlActions.setView('LOGIN');
      }
    }
  }

  render() {
    // Be explicit about what is available as props
    const {
      viewControlState, viewControlActions,
      storiesState, storiesActions,
      authState, authActions,
      momentViewState, momentViewActions,
      commentState, commentActions,
      updateState, updateActions,
      tokenState, tokenActions,
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
          onLoad={updateActions.fetchUpdates}
          updates={updateState}
          onPress={(moment) => viewControlActions.setView('MOMENT_VIEW', {moment: moment})}
          onCamera={ () => {viewControlActions.setView('CAMERAVIEW') }}
          onLogOut={ () => {viewControlActions.setView('LOGOUT') }}
          />);
      case "LOGIN":
        return (
          <LogIn
          successLoggedIn={ () => {
            tokenActions.checkTokenSuccess();
            viewControlActions.setView('HOME');
          }}
          onSignUp={ () => { viewControlActions.setView('SIGNUP') }}
          />);
      case "SIGNUP":
        return (
          <SignUp
          successSignedUp={ () => { 
            tokenActions.checkTokenSuccess();
            viewControlActions.setView('HOME') 
          }}
          onLogIn={ () => { viewControlActions.setView('LOGIN') }}
          />);
      case "LOGOUT":
        return (
          <LogOut
          successLoggedOut={ () => { viewControlActions.setView('LOGIN') }}
          successGotHome={ () => {
            viewControlActions.setView('HOME') }}
          />);
      case "LIBRARY":
        return (
          <Library
          stories={storiesState}
          onTouchImage={ (asset) =>{ viewControlActions.setView('STORY', { asset: asset }) }}
          />);
      case "STORY":
        return (
          <Story
          asset={viewControlState.passedProps.asset}
          onBack={()=>{viewControlActions.setView('LIBRARY')}}
          fetchComments={commentActions.fetchComments}
          comments={commentState.fetchedComments}
          submitComment={commentActions.submitComment}
          submitStatus={commentState.submitComment}
          />);
      case "NEW_STORY":
        return (
          <NewStory
          asset={viewControlState.passedProps.asset}
          storyTitle={viewControlState.passedProps.storyTitle}
          onBack={()=>{viewControlActions.setView('CAPTURE')}}
          onSubmit={()=>{
            viewControlActions.setView('LIBRARY');
          }}
          />
        );
      case "CAPTURE":
        return (
          <Capture
          onTouchImage={(asset)=>{ viewControlActions.setView('EDIT_MOMENT', { asset: asset }); }}
          />);
      case "EDIT_MOMENT":
        return(<EditMoment
          asset={viewControlState.passedProps.asset}
          onCancel={()=>{viewControlActions.setView('CAPTURE')}}
          onSubmit={(redirect, asset)=>{
              if (redirect === 'HOME') {
                viewControlActions.setView('HOME');
              } else {
                console.log('Asset from editMoment: ', asset);
                viewControlActions.setView('NEW_STORY', { asset: asset });
              }
            }
          }
        />);
      case "MOMENT_VIEW":
        return(<Moment
          onBack={ () => { viewControlActions.setView('HOME')}}
          fetchComments={commentActions.fetchComments}
          comments={commentState.fetchedComments}
          submitComment={commentActions.submitComment}
          submitStatus={commentState.submitComment}
          moment={viewControlState.passedProps.moment}
          commentsVisibility={momentViewState.commentsVisibility}
          setCommentsVisibility={momentViewActions.setCommentsVisibility}
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
    momentViewState: state.momentViewControl,
    commentState: state.commentData,
    tokenState: state.tokenControl,
    updateState: state.updates,
  }),
  (dispatch) => ({
    viewControlActions: bindActionCreators(actions.viewControlActions, dispatch),
    storiesActions: bindActionCreators(actions.storiesActions, dispatch),
    authActions: bindActionCreators(actions.authActions, dispatch),
    thunkFetch: bindActionCreators(actions.thunkFetch, dispatch),
    momentViewActions: bindActionCreators(actions.momentViewControlActions, dispatch),
    commentActions: bindActionCreators(actions.commentDataActions, dispatch),
    tokenActions: bindActionCreators(actions.tokenActions, dispatch),
    updateActions: bindActionCreators(actions.updateActions, dispatch)
  })
)(EpiLogApp);
