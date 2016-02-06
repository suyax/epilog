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
import AutoCompleteHelper from './autoComplete.js';

var Story = React.createClass({

  getInitialState: function() {
    const story = this.props.asset; 
    var moments = story.moments;
    var tagObjsByMoment = moments.map(function(momentObj){return momentObj['tags'];});
    var arrayOfTagObjectsForStory = tagObjsByMoment.reduce(function(aggregator,arrOfTags){return aggregator.concat(arrOfTags);}, []);
    var arrayOfTagNames = arrayOfTagObjectsForStory.map(function(tagObj){return tagObj['name'];});
    
    return {
      //holds all of the story titles associated with a particular user
      story: story,
      moments: moments,
      tagObjsByMoment: tagObjsByMoment,
      arrayOfTagNames: arrayOfTagNames,
      filteredMoments: moments
    };
  },

  filterMoments: function(event){
    var tagToFilterBy = event.nativeEvent.text;
    if(tagToFilterBy === ""){
      this.setState({filteredMoments: this.state.moments});
      return; 
    } else {
      var copyOfMoments = this.state.moments.slice(0);
      var filtered = copyOfMoments.filter(function(moment){
        var momentTagNames = moment['tags'].map(function(tagObj){
          return tagObj.name;
        });
        return momentTagNames.indexOf(tagToFilterBy) > -1;
      })
      this.setState({filteredMoments : filtered});
    }
  },

  render: function() {

    let { width, height } = Dimensions.get('window');
    const { asset, onBack } = this.props;


    return (
      <View style={styles.container}>
        <View style={styles.scrollViewContainer}>
          <AutoCompleteHelper 
            placeholder="Filter by Tag"
            data = {this.state.arrayOfTagNames}
            onFocus = {this.unfilterMoments}
            onBlur = {this.filterMoments}
          />
          <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={true}
              automaticallyAdjustContentInsets={false}
              horizontal={false}
              snapToInterval={height/2}
              snapToAlignment={'start'}>
              {this.state.filteredMoments.map(this.createRow)}
          </ScrollView>
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            key={this.state.story}
            onPress={onBack}
            onShowUnderlay={this.onHighlight}
            onHideUnderlay={this.onUnhighlight}>
            <View style={styles.row}><Text style={styles.buttonText}>Back</Text></View>
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  createRow: function(moment) {
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
            <Text style={styles.text}>{moment.createdAt.slice(0,10)}
            </Text>
        </View>
          <Image
          style={styles.timeLine}
          source={require('../image/greyLine.png')}
          >
          </Image>
      </View>
      )
  }
});

var styles = StyleSheet.create({
  timeLine: {
    flex:1,
    alignSelf:'center',
    width:2,
    height: 100
  },
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
   backgroundColor:'#92A8D1',
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
