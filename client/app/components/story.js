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

import NavBar from './navBar';
import AutoCompleteHelper from './autoComplete';

class Button extends Component{
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.button}
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
      newComment: "",
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
  renderComments () {
      const {comments, fetchComments} = this.props;
      if(comments.loading || comments.lastUpdated === undefined){
        return (<View><Text>Loading Comments...</Text></View>);
      } else if (comments.error){
        return (<View><Text>Sorry, but the Comments couldn't be loaded</Text></View>);
      } else {
        return (
          <View>
            {comments.data.map((comment)=>{
              return(
                <View key={comment.id}>
                  <Text style={{fontWeight: 'bold'}}>{comment.user.firstName} {comment.user.lastName}: <Text style={{fontWeight: 'normal'}}>{comment.text}</Text> </Text>
                  <Text style={{fontWeight: 'normal', color: 'gray', fontStyle: 'italic', fontSize: 12}}>{moment(comment.createdAt).fromNow()}</Text>
                  <Text></Text>
                </View>
                )
            })}
          </View>
          )
      }
    }


  fetch (moment) {
    console.log('fetch',moment);
    const {fetchComments, comments, submitStatus} = this.props;
    if ((comments.lastUpdated === undefined && !comments.loading) ||
      // did we load the correct set of comments?
      comments.momentId !== moment.id ||
      // or the last time we updated was 5 minutes ago
      (Date.now() - comments.lastUpdated) > (5 * 60 * 1000)){
      fetchComments(moment.id);
    }
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
      <View style={{position:'relative'}}>
      <View style={styles.container}>
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
          <TouchableHighlight
          onPress={()=>{ console.log(moment);this.fetch(moment)}}>
            <Image
              style={styles.backdrop}
              source={{uri: moment.url.slice()}}
              >
            </Image>
            </TouchableHighlight>
          </View>
          <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={true}
              automaticallyAdjustContentInsets={false}
              horizontal={false}
              snapToInterval={ Dimensions.get('window').width/2 }>
              {this.renderComments()}
          </ScrollView>
            <Text style={styles.text}>{moment.createdAt.slice(0,10)}
            </Text>
        </View>
          <Image
          style={styles.timeLine}
          source={require('../image/greyLine.png')}>
          </Image>
      </View>
      )
  }
}

var styles = StyleSheet.create({
  modalButtonText: {
    fontSize: 18,
    margin: 25,
    textAlign: 'center',
  },
  textInput: {
    alignSelf: 'center',
    height: 15,
    borderRadius: 2,
    padding: 1,
    width: 300,
    backgroundColor: '#FFFFFF',
    flex: 1,
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalImage: {
    flex:11,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  storyRow: {
    flex: 1
  },
  autoComplete: {
    position: 'absolute',
    top: -14,
    height: 30,
    width: Dimensions.get('window').width,
  },
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
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute'
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
     color: 'white'
   },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
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
  modalButton: {
    alignSelf: 'center',
    marginTop: 10,
    color: 'black'
  },
})

module.exports = Story
