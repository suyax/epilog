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

import Moment from 'moment';
import NavBar from './navBar';
import externalStyles from '../style/external-styles.js';

class Library extends Component {

  render() {
    const { stories } = this.props
    if (stories.loading || stories.data === undefined) {
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
            <Text style={externalStyles.dateText}>
            {Moment(parseInt(story.updatedAt)).fromNow()}
            </Text>
          </View>
          <View style={styles.imageBox}>
          <TouchableHighlight
            onPress={()=>{this.props.onTouchImage(story)}}
            onShowUnderlay={this.onHighlight}
            onHideUnderlay={this.onUnhighlight}>
            <Image
              source={{uri: story.moments[0].url}}
              style={externalStyles.roundThumbnail}
            >
            </Image>
          </TouchableHighlight>
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
    // height: 100,
  },
  timeBox: {
    flex: 1,
    marginLeft: 13,
    marginRight: 25,
  },
  imageBox: {
    flex: 2,
    // justifyContent:'flex-end'
  },
  storyInfoBox: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // width: 130,
    flex:2,
  },
  storyContainer: {
    padding: 20,
    alignItems: 'center',
    // height: 135,
    height: Dimensions.get('window').width*2/5,
    width: Dimensions.get('window').width,
    flexDirection: 'row'
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
});

module.exports = Library;
