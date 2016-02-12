
"use strict";

var React = require("react-native");
var Camera = require("react-native-camera");

var {
  AppRegistry,
  CameraRoll,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} = React;

var CameraView = React.createClass({
  
  getInitialState: function() {
    return {
      cameraType: Camera.constants.Type.back
    }
  },

  getRecentPhoto: function(){CameraRoll.getPhotos({first: 1}, this._appendAssets, logError)},

  render: function() {
    const { onGoToGallery } = this.props;

    return (
      <Camera
        ref="cam"
        style={styles.container}
        type={this.state.cameraType}>
        <View style={styles.positionBox}></View>
        <View style={styles.options}>
          <TouchableHighlight onPress={onGoToGallery}>
            <Text style={styles.optionText}>
              Gallery
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._takePicture}>
            <Text style={styles.takeText}>
              Capture
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._switchCamera}>
            <Text style={styles.optionText}>
              Flip
            </Text>
          </TouchableHighlight>
          </View>
      </Camera>
    );
  },

  _switchCamera: function() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  },

  _takePicture: function() {
    const { onTakePicture } = this.props;
    this.refs.cam.capture(function(err, data) {
      onTakePicture();
      console.log(err, data);
    });
  }
});

var styles = StyleSheet.create({
  positionBox: {
    flex: 13
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "transparent",
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    backgroundColor: 'white',
  },
  optionText: {
    textAlign: "center",
    fontWeight:'bold',
    fontSize: 20,
    color: ' grey',
    width: 135,
    backgroundColor: 'white'
  },
  takeText: {
    textAlign: "center",
    fontWeight:'bold',
    fontSize: 20,
    color: 'orange',
    width: 135,
  },
});

module.exports = CameraView;
