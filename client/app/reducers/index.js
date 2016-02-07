/*combine all the reducers into this file*/

import viewControl from './viewControl';
import libraryControl from './libraryControl';
import stories from './stories';
import momentViewControl from './momentViewControl';
import commentData from './commentData';
import { combineReducers } from 'redux';

export default combineReducers({
  viewControl,
  libraryControl,
  stories,
  momentViewControl,
  commentData,
});
