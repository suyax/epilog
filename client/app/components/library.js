import React, {
  Component,
  Image,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  StyleSheet,
  Text,
  View,
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
        <TouchableHighlight
          key={story.id}
          onPress={()=>{this.props.onTouchImage(story)}}
          onShowUnderlay={this.onHighlight}
          onHideUnderlay={this.onUnhighlight}>
          <View style={styles.storyContainer}>
            <Image
              source={{uri: story.moments[0].url}}
              style={styles.thumbnail}
            />
              <Text style={styles.title}>{story.title}</Text>
              <View>
                <Text style={styles.text}>{story.updatedAt.slice(0,10)}
                </Text>
              </View>
          </View>
        </TouchableHighlight>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor:'#92A8D1',
  },
  storyContainer: {
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    alignItems: 'center',
    width: 180,
    height: 135,
    borderWidth: 1,
    borderColor: '#CCC'
  },
  textContainer: {
    flex: 1,
    marginBottom: 8,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
  thumbnail: {
    width: 80,
    height: 80
  },
  list: {
    flex: 11,
  },
  listView: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navBar: {
    flex: 1,
    alignItems: 'center',
  }
});

module.exports = Library;
