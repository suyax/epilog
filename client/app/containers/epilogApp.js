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

import Home from '../components/home';
import Capture from '../components/capture';
import Library from '../components/library';
import Story from '../components/story';
import NewStory from '../components/newStory';
import EditMoment from '../components/editMoment';

var REQUEST_URL = 'http://127.0.0.1:3000/api/stories';

//router for the app
class EpiLogApp extends Component {

  componentDidMount() {
    this.fetchStories();
  }

  // this coud be a thunk
  fetchStories() {
    const { storiesActions } = this.props;

    storiesActions.fetchStories();
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('The Response Data: ', responseData.stories);
        storiesActions.recieveStories(responseData.stories);
      })
      .catch((error)=> {
        storiesActions.failureStories(error)
      })
      .done();
  }

  render() {
    // Be explicit about what is availible as props
    const { 
      viewControlState, 
      viewControlActions, 
      storiesState,
    } = this.props;

    switch (viewControlState.currentView) {
      case "HOME":
        return <Home />;

      case "LIBRARY":
        return (
          <Library
          stories={storiesState}
          onTouchImage={
            asset =>{
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

      case "NEW_STORY":
        return (
          <NewStory 
          asset={viewControlState.passedProps.asset}
          onBack={()=>{viewControlActions.setView('EDIT_MOMENT')}}
          />
        );

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
          onTouchImage={
            (asset)=>{
              viewControlActions.setView('NEW_STORY', {
                asset: asset
              });
            }
          }
          />);
        
      default:
        return <Home />;
    }
  }
}

export default connect(state => ({
    viewControlState: state.viewControl,
    storiesState: state.stories,
  }),
  (dispatch) => ({
    viewControlActions: bindActionCreators(actions.viewControlActions, dispatch),
    storiesActions: bindActionCreators(actions.storiesActions, dispatch),
  })
)(EpiLogApp);

