var React = require('react-native');
var {
  AsyncStorage,
  Component,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  PixelRatio,
  Dimensions,
  TouchableHighlight,
  NativeModules,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
} = React;

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import {SERVER_URL} from '../urls';
import NavBar from './navBar';
import externalStyles from '../style/external-styles.js';

class NewStory extends Component {

  constructor(props){
    super(props);
    this.state = {
      visibleHeight: Dimensions.get('window').height
    }
  }

  componentWillMount () {
    DeviceEventEmitter.addListener('keyboardWillShow', (e)=>{
      let newSize = Dimensions.get('window').height - e.endCoordinates.height
      this.setState({visibleHeight: newSize})
    });
    DeviceEventEmitter.addListener('keyboardWillHide', (e)=>{
      this.setState({visibleHeight: Dimensions.get('window').height})
    });
  }

  componentWillUnmount(){
    DeviceEventEmitter.removeAllListeners('keyboardWillShow');
    DeviceEventEmitter.removeAllListeners('keyboardWillHide');
  }

  submitNewStory(textInputs, asset) {
    var title = textInputs.newStoryTitle;
    var description = textInputs.newStoryDescription;
    var caption = asset.node.caption;
    var existingUsersToInclude = textInputs.newStoryCharacters.split(', ');

    return AsyncStorage.getItem('token')

      .then((result) => {
        fetch(SERVER_URL + '/api/users', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': result,
            'emails': JSON.stringify(existingUsersToInclude)
          }
        })
        .then((response) => response.json())
        .then((responseData) => {
          return {
            'token': result,
            'userids': responseData
          }
        })
        .then((result) => {
          fetch(SERVER_URL + '/api/stories', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': result.token
            },
            body: JSON.stringify({
              title: title,
              description: description,
              existingUsersToInclude: result.userids
            })
          })
          .then((response) => response.json())
          .then((responseData) => {

            AsyncStorage.getItem('token')
              .then((result) => {
                fetch(SERVER_URL + '/api/users', {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': result,
                    'emails': JSON.stringify(existingUsersToInclude)
                  }
                })
                .then((response) => response.json())
                .then((responseData) => {
                  return {
                    'token': result,
                    'userids': responseData
                  }
                })
                .then((result) => {
                  var characters = String(result.userids) + '_' || '';

                  return {
                    uri: asset.node.image.uri,
                    uploadUrl: SERVER_URL + '/api/moments',
                    fileName: title + '_' + caption + '_' +
                      String(responseData.storyId) + '_' +
                      String(responseData.userId) + '_' + characters + '.png',
                    mimeType: 'image',
                    headers: {
                      token: result.token,
                      tags: JSON.stringify(asset.momentTags),
                    }
                  };
                })
                .then((result) => {
                  NativeModules.FileTransfer.upload(result, (err, res) => {
                    if (err) {
                      console.log(err);
                    } else {
                      fetch(SERVER_URL + '/api/tags/' + JSON.parse(res.data).momentId, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'token': result.headers.token,
                          'tags': JSON.stringify(JSON.parse(res.data).tags)
                        }
                      });
                      return res;
                    }
                  });
                })
              })
          })
          .catch((error) => {
            // console.error(error);
          });
        });
      });
  }


  render() {
    let { width, height } = Dimensions.get('window');
    const { asset, onBack, onSubmit } = this.props;
    const newStory = this.props.asset;
    var textInputs = {
      newStoryTitle: asset.storyTitle
    };

    return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[externalStyles.viewBody]}>
          <View style={externalStyles.topBar}>
            <Text style={externalStyles.viewTitle}>
              New story
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Text style={styles.title}>
              {textInputs.newStoryTitle}
            </Text>
            <Image
              source={{uri: asset.node.image.uri}}
              style={styles.thumbnail}
            />
          </View>
          <View style={externalStyles.textContainer}>
            <TextInput 
              style={externalStyles.textInput} 
              placeholder='Story Description'
              onChangeText={(text)=>textInputs.newStoryDescription = text} 
            />
          </View>
          <View style={externalStyles.textContainer}>
            <TextInput 
              style={externalStyles.textInput} 
              placeholder='Add friends to your story'
              onChangeText={(text)=>textInputs.newStoryCharacters = text}
              onSubmitEditing={() => {dismissKeyboard()}} 
            />
          </View>
          <View style={externalStyles.buttonContainer}>
            <TouchableHighlight onPress={onBack}>
              <Text style={externalStyles.button}>
                Cancel
              </Text>
            </TouchableHighlight>

            <TouchableHighlight key={asset} onPress={() => {
              if (textInputs.newStoryTitle && textInputs.newStoryDescription) {
                this.submitNewStory(textInputs, asset)
                  .then(() => {
                    onSubmit();
                  });
              }
            }}>
              <Text style={externalStyles.button}>
                Submit
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

var styles = StyleSheet.create({
  thumbnail: {
    width: 320,
    height: 240,
    alignSelf: 'center'
  },
  title: {
    margin: 15,
    fontSize: 28,
    color: '#3d3d3d',
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 4,
    justifyContent: 'space-around',
  },
});

module.exports = NewStory;
