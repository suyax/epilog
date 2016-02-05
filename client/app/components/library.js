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

class Library extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { stories } = this.props

    if (!stories.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
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
      <View style={styles.container}>
        <View style={styles.list}>
          <Text>
            Loading stories...
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
      <View
        key={story.id}
      >
          <View style={styles.storyContainer}>
              <View style={styles.timeBox}>
                <Text style={styles.text}>{story.updatedAt.slice(0,4)+'\n'+story.updatedAt.slice(5,10)}
                </Text>
              </View>
              <View style={styles.imageBox}>
                <Image
                  source={{uri: story.moments[0].url}}
                  style={styles.thumbnail}
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
              <View style={styles.groupBox}>
              <Text style={styles.headline}>
              {story.description}
              </Text>
              </View>
          </View>
        <Image
        style={styles.timeLine}
        source={require('../image/greyLine.png')}
        >
        </Image>
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
    flex: 2
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
    marginTop:10,
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
    flex: 11,
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
