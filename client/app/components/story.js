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
  Dimensions,
  TouchableHighlight
} from 'react-native';

import NavBar from './navBar';

class Story extends Component {

  render() {
    let { width, height } = Dimensions.get('window');
    const {asset, onBack} = this.props;
    const story = this.props.asset;
    return (
      <View>
        <View style={styles.container}>
          <ScrollView
              style={[styles.scrollView, styles.horizontalScrollView]}
              automaticallyAdjustContentInsets={false}
              horizontal={true}
              snapToInterval={width - 20}
              snapToAlignment={'start'}>
              {story.moments.map(this.createRow)}
          </ScrollView>
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            key={story}
            onPress={onBack}
            onShowUnderlay={this.onHighlight}
            onHideUnderlay={this.onUnhighlight}>
            <View style={styles.row}><Text style={styles.buttonText}>Back</Text></View>
          </TouchableHighlight>
        </View>
      </View>
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
    flex: 11,
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 500,
  },
  horizontalScrollView: {
    height: Dimensions.get('window').height-50,
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
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#81c04d'
  },
});

module.exports = Story
