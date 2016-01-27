/*combine all the reducers into this file*/

import viewControl from './viewControl';
import libraryControl from './libraryControl';
import { combineReducers } from 'redux';

export default combineReducers({
  viewControl,
  libraryControl
});
