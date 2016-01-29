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

var REQUEST_URL = 'http://127.0.0.1:3000/api/stories';

class Library extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
      };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
        console.log('The Response Data: ', responseData.stories);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
            loaded: true,
          });
        })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderStory.bind(this)}
          renderScrollComponent={props => <RecyclerViewBackedScrollView
            {...props} />}
          contentContainerStyle={styles.listView}
          style={styles.list}
        />
        <View style={styles.navBar}>
          <NavBar />
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading stories...
        </Text>
      </View>
    );
  }

  renderStory(story) {
    console.log(story);
    return (
      <View>
        <TouchableHighlight
          key={story}
          onPress={()=>{this.props.onTouchImage(story)}}
          onShowUnderlay={this.onHighlight}
          onHideUnderlay={this.onUnhighlight}>
          <View style={styles.storyContainer}>
            <Image
              source={{uri: story.moments[0].url}}
              style={styles.thumbnail}
            />
              <Text style={styles.title}>{story.title}</Text>
          </View>
        </TouchableHighlight>
    </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storyContainer: {
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: '#F6F6F6',
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
    flex: 11
  },
  listView: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  navBar: {
    flex: 1,
  }
});

module.exports = Library;
