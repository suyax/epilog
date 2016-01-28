import React, {
  Component,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  ListView,
  PixelRatio,
  Dimensions
} from 'react-native';

import NavBar from './navBar';

class Story extends Component {

  render() {
    let { width, height } = Dimensions.get('window');
    const {asset} = this.props;
    const story = this.props.asset;
    return (
      <ScrollView
        style={[styles.scrollView, styles.horizontalScrollView]}
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        snapToInterval={width - 20 }
        snapToAlignment={'start'}>
        {story.moments.map(this.createRow)}
      </ScrollView>
    );
  }
  createRow(moment) {
    return (
      <View key={moment.id} style={styles.container}>
        <View style={styles.storyContainer}>
          <Image
            source={{uri: moment.url}}
            style={styles.thumbnail}
          />
            <Text style={styles.title}>{moment.caption}</Text>
        </View>
      </View>
      )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  content: {
    flex: 11,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  thumbnail: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-50,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
});

module.exports = Story
