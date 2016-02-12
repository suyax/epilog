var React = require('react-native');
const {
  Component,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  Modal,
  Dimensions,
} = React;

import moment from 'moment';

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

class Moment extends Component{

  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
    }
  }

  componentWillMount () {
    const {fetchComments, moment, comments, submitStatus} = this.props;
    if ((comments.lastUpdated === undefined && !comments.loading) ||
      // did we load the correct set of comments?
      comments.momentId !== moment.id ||
      // or the last time we updated was 5 minutes ago
      (Date.now() - comments.lastUpdated) > (5 * 60 * 1000)){
      fetchComments(moment.id);
    }
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
                <Text style={{fontWeight: 'bold', fontFamily: 'Futura'}}>{comment.user.firstName} {comment.user.lastName}: <Text style={{fontWeight: 'normal'}}>{comment.text}</Text> </Text>
                <Text style={{fontWeight: 'normal', color: 'gray', fontStyle: 'italic', fontSize: 12, fontFamily: 'Futura'}}>{moment(comment.createdAt).fromNow()}</Text>
                <Text></Text>
              </View>
              )
          })}
        </View>
        )
    }
  }

  render (){
    let { width, height } = Dimensions.get('window');
    const { onBack, moment, comments, submitComment, fetchComments } = this.props;
    console.log('moment',this.props)
    const innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};
    return (
      <View style={{flex: 1}}>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
          key={this.state.moment}
          onPress={onBack}>
            <Text style={ styles.buttonText }>
              Back
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: moment.url}}
            style={styles.image}>
          </Image>
          <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={true}
              automaticallyAdjustContentInsets={false}
              horizontal={false}
              snapToInterval={height/2}>
              {this.renderComments()}
          </ScrollView>
            <View style={styles.commentInputForm}>
              <View style={{flex: 11}}> 
               <TextInput
                 value={this.state.newComment}
                 style={styles.textInput}
                 placeholder={'Write a Comment'}
                 onChangeText={(text) => this.setState({newComment: text})}
               />
              </View>
              <View style={{flex: 1, backgroundColor: 'white'}}>
               <TouchableHighlight
                 style={styles.commentButton}
                 onPress={()=>{
                   submitComment(this.state.newComment,moment.id)
                   .then(()=>fetchComments(moment.id))
                   .then(()=>this.setState({newComment:""}));
                 }}>
                   <Image
                     style={{backgroundColor: 'white'}}
                     source={require('../image/Submit.gif')}/>
               </TouchableHighlight>
              </View>
            </View> 
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  textInput: {
    height: 44,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Futura',
    flex: 1,
    padding: 10, 
    textAlign: 'left'
  },
  scrollView: {
    fontFamily: 'Futura',
    padding: 10, 
    flex: 3,
    backgroundColor: '#FFFFFF'
  },
  image:{
    flex:11,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  imageContainer:{
    flex: 11,
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor:'#92A8D1',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  commentInputForm: {
    flexDirection: 'row'
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontFamily: "Noteworthy",
    fontSize: 18,
    margin: 25,
    textAlign: 'center',
  },
  commentButton: {
    height: 34, 
    backgroundColor: 'white',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
});

module.exports = Moment;
