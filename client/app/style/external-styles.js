import React, {
  StyleSheet,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const externalStyles = StyleSheet.create({
  viewTitle: {
    fontSize: 35,
    color: '#ffffff',
    alignSelf: 'center',
  },
  contentText: {
    fontSize: 15,
    color: '#3d3d3d',
    marginLeft: 10,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  dateText: {
    fontSize: 18,
    color: '#5379ae',
    textAlign: 'justify',
    marginLeft: 12,
  },
  storyTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: '#5379ae'
  },
  squareThumbnail: {
    width: 150,
    height: 150,
  },
  rectangleThumbnail: {
    alignSelf: 'center',
    width: 200,
    height: 150,
  },
  roundThumbnail: {
    alignSelf: 'center',
    width: 155,
    height: 155,
    borderRadius: 80
  },
  topBar: {
    flex: 1,
    backgroundColor: '#957a78',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewBody: {
    width: width,
    height: height,
    // flex: 9,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor:'#fffaef',
  },
  timeLine: {
    flex: 1,
  width: 2,
    height: 100,
    marginTop: 5,
    marginLeft: 183,
    backgroundColor: '#5379ae',
  },
  horizontalLine: {
    height: 1,
    width: 115,
    marginLeft: 9,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: '#5379ae',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginTop: 40,
  },
  button: {
    width: 120,
    height: 45,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#957a78',
    color: '#ffffff',
    paddingTop: 13,
  },
  textContainer: {
    alignSelf: 'center',
    flex: 1,
    borderBottomColor: '#b6b6b6',
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginTop: 15,
    width: 400,
  },
  textInput: {
    height: 40,
    backgroundColor:'white',
    textAlign: 'center',
    margin: 0,
    color: ' #2C3539'
  },
});

module.exports = externalStyles;
