/*combine all the reducers into this file*/

import viewControl from './viewControl';
import stories from './stories';
import momentViewControl from './momentViewControl';
import commentData from './commentData';
import tokenControl from './tokenControl';
import { combineReducers } from 'redux';
import updates from './updateControl';

export default combineReducers({
  viewControl,
  stories,
  momentViewControl,
  commentData,
  tokenControl,
  updates,
});
