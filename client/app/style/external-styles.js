import React, {
  StyleSheet
} from 'react-native';

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
    flex: 9,
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
});

module.exports = externalStyles;
