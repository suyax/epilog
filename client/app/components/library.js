import React, {
  Component,
  Image,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import NavBar from './navBar';
import externalStyles from '../style/external-styles.js';

class Library extends Component {

  render() {
    const { stories } = this.props

    if (stories.loading) {
      return this.renderLoadingView();
    }

    return (
      <View style={externalStyles.viewBody}>
        <View style={externalStyles.topBar}>
          <Text style={externalStyles.viewTitle}>
            Library
          </Text>
        </View>
        <RecyclerViewBackedScrollView style={styles.list}>
          <View style = {styles.listView}>
            {stories.data.map(
              (story) => {
                return this.renderStory(story);
              })
            }
          </View>
        </RecyclerViewBackedScrollView>
        <View style={styles.navBar}>
          <NavBar />
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={externalStyles.viewBody}>
        <View style={styles.list}>
          <Text>
            Loading Stories...
          </Text>
        </View>
        <View style={styles.navBar}>
          <NavBar />
        </View>
      </View>
    );
  }

  renderStory(story) {
    return (
      <View key={story.id}>
        <View style={styles.storyContainer}>
          <View style={styles.timeBox}>
            <Text style={externalStyles.dateText}>{story.updatedAt.slice(0,4)+'\n'+story.updatedAt.slice(5,10)}
            </Text>
          </View>
          <View>
            <Image
              source={{uri: story.moments[0].url}}
              style={externalStyles.roundThumbnail}
            >
              <TouchableHighlight
                onPress={()=>{this.props.onTouchImage(story)}}
                onShowUnderlay={this.onHighlight}
                onHideUnderlay={this.onUnhighlight}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>{story.title}</Text>
                </View>
              </TouchableHighlight>
            </Image>
          </View>
          <View style={styles.storyInfoBox}>
            <Text style={externalStyles.storyTitle}>{story.title}</Text>
            <View style={externalStyles.horizontalLine}>
            </View>
            <Text style={externalStyles.contentText}>
              {story.description}
            </Text>
          </View>
        </View>
        <View style={externalStyles.timeLine}>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  timeLine: {
    flex:1,
    marginLeft: 40,
    alignSelf:'stretch',
    width:2,
    height: 100,
  },
  timeBox: {
    marginLeft: 13,
    marginRight: 25,
  },
  imageBox: {
    flex: 7,
    justifyContent:'flex-end'
  },
  groupBox: {
    flex: 3,
  },
  titleBox: {
    marginTop:100,
    height: 75,
    width: 150,
    backgroundColor:'rgba(146, 168, 209, 0.5)',
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  text:{
    textAlign: 'center',
    color: ' white',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor:'#92A8D1',
  },
  storyContainer: {
    padding: 5,
    margin: 5,
    alignItems: 'center',
    height: 135,
    width: Dimensions.get('window').width,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    marginBottom: 8,
    alignItems: 'center',
  },
  thumbnail: {
    alignSelf:'center',
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  headline: {
     fontSize: 12,
     padding: 10,
     height:100,
     textAlign: 'left',
     borderRadius: 5,
     backgroundColor: 'rgba(0,0,0,0.2)',
     color: 'white',
   },
  list: {
    flex: 9,
  },
  navBar: {
    flex: 1,
    alignItems: 'center',
  },
  listView: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  storyInfoBox: {
    marginRight: 10,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 130,
  },
});

module.exports = Library;
