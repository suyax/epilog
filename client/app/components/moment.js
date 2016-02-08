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
                <Text>{comment.user.firstName}</Text>
                <Text>{comment.user.lastName}</Text>
                <Text>{comment.text}</Text>
              </View>
              )
          })}
        </View>
        )
    }
  }

  render (){
    const {moment, comments, submitComment, fetchComments} = this.props;
    var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};
    return (
      <View style={{flex: 1}}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: moment.url}}
            style={styles.image}>
          </Image>
          <Button onPress={()=>this.props.setCommentsVisibility(true)}>
            Comments
          </Button>
        </View>

        <Modal
          animated={true}
          transparent={true}
          visible={this.props.commentsVisibility}>
          <View style={[styles.container]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Button
                onPress={()=>this.props.setCommentsVisibility(false)}
                style={styles.modalButton}>
                Close
              </Button>
              <TextInput 
                value={this.state.newComment}
                style={styles.textInput} 
                placeholder={'Write a Comment'}
                onChangeText={(text) => this.setState({newComment: text})}
              />
              <Button
                onPress={()=>{
                  submitComment(this.state.newComment,moment.id)
                  .then(()=>fetchComments(moment.id))
                  .then(()=>this.setState({newComment:""}));
                }}
                style={styles.modalButton}>
                Submit
              </Button>
              <ScrollView>
                {this.renderComments()}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    height: 15,
    borderRadius: 2,
    padding: 1,
    width: 350,   
    backgroundColor: '#FFFFFF',
    flex: 1,
    textAlign: 'center'
  },
  image:{
    flex:11,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  imageContainer:{
    flex: 1,
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
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});

module.exports = Moment;
