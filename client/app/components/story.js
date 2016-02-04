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
      <View style={styles.container}>
        <View style={styles.scrollViewContainer}>
          <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={true}
              automaticallyAdjustContentInsets={false}
              horizontal={false}
              snapToInterval={height/2}
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
            style={styles.backdrop}
            source={{uri: moment.url}}>
          </Image>
          <View>
            <Text style={styles.headline}>{moment.caption}</Text>
          </View>
            <Text style={styles.text}>2015.2.1
            </Text>
        </View>
          <Image
          style={{flex:1, alignSelf:'center', width:2, height: 100}}
          source={require('../image/greyLine.png')}
          >
          </Image>
      </View>
      )
  }
}

var styles = StyleSheet.create({
  storyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 11,
  },
  scrollView: {
    backgroundColor: '#6A85B1',
  },
  content: {
    flex: 11,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  thumbnail: {
    flex: 1,
    width: Math.floor(Dimensions.get('window').width/3),
    height:Math.floor(Dimensions.get('window').height/4),
    alignSelf: 'center',
  },
  headline: {
     fontSize: 20,
     padding: 10,
     textAlign: 'center',
     borderRadius: 5,
     backgroundColor: 'rgba(0,0,0,0.2)',
     color: 'white',
   },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  backdrop: {
    paddingTop: 100,
    height: 180,
    width: 180,
    borderRadius: 90,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 8,
  },
  text:{
    textAlign: 'center',
    color: ' white',
  },
});

module.exports = Story
