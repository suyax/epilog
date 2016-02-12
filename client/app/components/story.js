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
  TextInput,
  TouchableHighlight,
  Modal,
} from 'react-native';

import externalStyles from '../style/external-styles.js';
import NavBar from './navBar';
import AutoCompleteHelper from './autoComplete';

class Button extends Component{
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[styles.button]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

class Story extends Component {
  constructor(props) {
    super(props);
  }

  //upon initialization...
  componentWillMount() {
    const {fetchComments, moment, comments, submitStatus} = this.props;
    //grab the story object associated with the story rendered on the story view (note: this
    //is passed in from the library view)
    const story = this.props.asset;
    //define variables that will ultimately give us access to the story's moments and tags
    const moments = story.moments;
    const checkTags = moments.filter(function(tag){
      if (tag['tags']){
        return tag;
      }
    });
    var tagObjsByMoment = checkTags.map(function(momentObj){if (momentObj){return momentObj['tags']}});
    var arrayOfTagObjectsForStory = tagObjsByMoment.reduce(function(aggregator,arrOfTags){return aggregator.concat(arrOfTags);}, []);
    var arrayOfTagNames = arrayOfTagObjectsForStory.map(function(tagObj){return tagObj['name'];});
    //set the variables defined above to the view's state
    this.state = {
      //holds all of the story titles associated with a particular user
      story: story,
      //all of the moments associated with the story
      moments: moments,
      tagObjsByMoment: tagObjsByMoment,
      //all of the tags associated with the story
      arrayOfTagNames: arrayOfTagNames,
      //moments filtered by tag; should START by being equal to ALL of the moments.
      filteredMoments: moments
    };
  }

  //helper func that filters a story's moments based on tag name
  filterMoments(event){
    //grab tag name entered into auto complete search field
    var tagToFilterBy = event.nativeEvent.text;
    //if nothing has been entered, set filtered array to ALL moments
    if(tagToFilterBy === ""){
      this.setState({filteredMoments: this.state.moments});
      return;
    //otherwise, filter moments by tag name. if tag name doesn't match anything in db, return an empty array
    //(i.e. nothing should be displayed on the page)
    } else {
      var copyOfMoments = this.state.moments.slice(0);
      var filtered = copyOfMoments.filter(function(moment) {
        if(moment['tags']) {
          var momentTagNames = moment['tags'].map(function(tagObj) {
            return tagObj.name;
          });
          return momentTagNames.indexOf(tagToFilterBy) > -1;
        } else {
          return false;
        }
      })
      this.setState({filteredMoments : filtered});
    }
  }

  render(){
    let { width, height } = Dimensions.get('window');
    const { asset, onBack , onPress} = this.props;
    const story = this.props.asset;
    return (
      <View>
      <View style={styles.container}>
      <View style={externalStyles.topBar}>
        <View style={[styles.row, {flex:1, alignItems:'flex-start'}]}>
          <TouchableHighlight
            key={this.state.story}
            onPress={onBack}
            onShowUnderlay={this.onHighlight}
            onHideUnderlay={this.onUnhighlight}>
            <View style={[styles.row]}><Text style={styles.buttonText}>Back</Text></View>
          </TouchableHighlight>
        </View>
        <View style={{alignSelf:'center'}}>
        <Text style={[externalStyles.viewTitle,{flex:10} ] }>
          Story
        </Text>
        </View>
        <View style={{flex:1}}>
        </View>
      </View>
      <View style={{flex:1, backgroundColor:'#fffaef'}}>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={true}
            automaticallyAdjustContentInsets={false}
            horizontal={false}
            snapToInterval={height/2}
            snapToAlignment={'start'}>
            {this.state.filteredMoments.map(this.createRow.bind(this))}
        </ScrollView>
      </View>
      </View>
      <View style={styles.autoComplete}>
        <AutoCompleteHelper
          placeholder="Filter by Tag"
          data = {this.state.arrayOfTagNames}
          onFocus = {this.unfilterMoments}
          onBlur = {this.filterMoments}
        />
      </View>
      </View>
    )
  }

  createRow(moment) {
    return (
      <View key={moment.id} style={styles.storyRow}>
        <View style={styles.storyContainer}>
          <View>
            <TouchableHighlight onPress={()=>this.props.onPress(moment)}>
            <Image
              style={styles.backdrop}
              source={{uri: moment.url}}>
            </Image>
            </TouchableHighlight>
          </View>
          <View>
            <Text style={styles.headline}>{moment.caption}</Text>
            <View style={{alignSelf: 'center'}}>
            <Text style={styles.dateText}>{moment.createdAt.slice(0,10)}
            </Text>
            </View>
          </View>
        </View>
        <View
        style={styles.timeLine}>
        </View>
      </View>
      )
  }
}

var styles = StyleSheet.create({
  storyRow: {
    flex: 1
  },
  autoComplete: {
    top: Dimensions.get('window').width/6 ,
    height: 48,
    width: Dimensions.get('window').width,
  },
  timeLine: {
    flex: 1,
    width: 2,
    height: 100,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: Dimensions.get('window').width/2,
    backgroundColor: '#5379ae',
  },
  storyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute'
  },
  scrollViewContainer: {
    flex: 9,
  },
  scrollView: {
    backgroundColor:'#fffaef',
  },
  thumbnail: {
    flex: 1,
    width: Math.floor(Dimensions.get('window').width/3),
    height:Math.floor(Dimensions.get('window').height/4),
    alignSelf: 'center',
  },
  headline: {
     fontSize: 14,
     fontFamily: 'Futura',
     padding: 10,
     textAlign: 'center',
     borderRadius: 5,
     backgroundColor: 'rgba(0,0,0,0.2)',
     color: '#5379ae'
   },
  buttonText: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white'
  },
  row: {
    flex: 1,
    justifyContent: 'center',
  },
  backdrop: {
    paddingTop: 100,
    height: 180,
    width: 180,
    borderRadius: 90,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 8,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Futura',
    color: '#5379ae',
    textAlign: 'justify',
  },
})

module.exports = Story
