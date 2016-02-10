var React = require('react-native');
const {SERVER_URL} = require('../urls');
var {
  Component,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  NativeModules,
  AsyncStorage
} = React;

import AutoCompleteHelper from './autoComplete.js';

var EditMoment = React.createClass({

  getInitialState: function() {
      return {
        //holds all of the story titles associated with a particular user
        arrayOfStoryTitles: [],
        //name of story entered into story field
        currentStory: "",
        //look up hash that checks currentStory against stories associated with user in db
        storyIdLookUp: {},
        //all tags associated with a particular story
        arrayOfStoryTags: []
      };
  },

  //upon initialization, grabs all stories associated with a particular user, assuming the user has a valid token
  componentDidMount: function() {
    var storyTitlesUrl = SERVER_URL + '/api/stories';
    
    return AsyncStorage.getItem('token')
      .then((result) => {
        return fetch(storyTitlesUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token': result
            }
          })
          .then((response) => {
            return response.json();
          })
          .then((responseData) => {
            for(var i = 0; i < responseData.length; i++){
              this.state.storyIdLookUp[responseData[i]['title'].toLowerCase()] = responseData[i]['id'];
            }
            var titles = responseData.map(function(storyObj){ return storyObj.title });
            this.setState({arrayOfStoryTitles: titles});
          })
          .catch((error) => {
            console.log("error from db query:", error);
          });
      })
      .then((result) =>{
        return result;
      })
      .catch((error) => {
        console.log(error);
      })
  },

  //grabs all tags for a given story in the db; if story is NEW...returns an empty array
  getStoryTags: function(event){
    this.setState({currentStory: event.nativeEvent.text});

    if(this.state.currentStory.toLowerCase() in this.state.storyIdLookUp){
      var storyId = this.state.storyIdLookUp[this.state.currentStory];
      var storyTagsUrl = SERVER_URL + '/api/tags/' + storyId;

      return AsyncStorage.getItem('token')
        .then((result) => {
          return fetch(storyTagsUrl, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': result
              }
            })
            .then((response) => {
              return response.json()
            })
            .then((responseData) => {
              var tags = responseData;
              this.setState({arrayOfStoryTags: tags});
            })
            .catch((error) => {
              console.log("error from db query:", error);
            });
        })
        .then((result) =>{
          return result;
        })
        .catch((error) => {
          console.log(error);
        })
    
    }
  },

  submitMoment: function(textInputs, asset) {
    var storyTitle = this.state.currentStory;
    var momentCaption = textInputs.caption;
    var checkStoryURL = SERVER_URL + '/api/stories?storyTitle=' + storyTitle.split(' ').join('%20');
    var momentTags = textInputs.momentTags.split(', ');

    return AsyncStorage.getItem('token')
      .then((result) => {
        return fetch(checkStoryURL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': result,
            'caption': momentCaption,
          }
        })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData) {
            var storyid = responseData.id;
            var title = storyTitle.split(' ').join('%20');
            var caption = momentCaption.split(' ').join('%20');
            var userid = responseData.users_stories.userId;

            AsyncStorage.getItem('token')
              .then((result) => {
                return {
                  uri: asset.node.image.uri,
                  uploadUrl: SERVER_URL + '/api/moments',
                  fileName: title + '_' + caption + '_' + String(storyid) + '_' + String(userid) + '_.png',
                  mimeType: 'image',
                  headers: {
                    token: String(result),
                    tags: JSON.stringify(momentTags)
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
              });

            return 'HOME';
          } else {
            asset.node.caption = momentCaption;
            console.log('Asset passed to NEW_STORY: ', asset);

            return 'NEW_STORY';
          }
        })
        .catch((error) => {
          // console.log(error);
        });
      })
      .then((result) => {
        return result
      });
  },
  
  //renders autocomplete fields in addition to caption field + image
  render: function() {
    const {asset, onCancel, onSubmit} = this.props;
    var textFields = {};
    var image = asset.node.image;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.imageWide}/>
        </View>
        <View style={styles.content}>
          <AutoCompleteHelper
            placeholder="Story Title" 
            data={this.state.arrayOfStoryTitles} 
            onBlur={this.getStoryTags}
          />
        </View>
        <View style={ styles.textContainer }>
          <TextInput style={styles.textInput} placeholder='Create a Caption'
            onChangeText={(text)=>textFields.caption = text}/>
          <TextInput style={styles.textInput} placeholder='Tag your moment'
            onChangeText={(text)=>textFields.momentTags = text}/>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={onCancel}>
            <View><Text style={styles.button}>Cancel</Text></View>
          </TouchableHighlight>
          <TouchableHighlight key={asset} onPress={() => {
              if (this.state.currentStory && textFields.caption) {
                this.submitMoment(textFields, asset)
                  .then((result) => {
                    onSubmit(result, asset);
                  });
              }
            }
          }>
            <View><Text style={styles.button}>Submit</Text></View>
          </TouchableHighlight>
        </View>
        </View>        
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor: 'grey'
  },
  row: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  textContainer: {
    marginBottom: 20,
    flex: 0.3
  },
  textInput: {
    flexWrap: 'wrap',
    alignSelf: 'center',
    height: 5,
    width: 350,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,   
    backgroundColor: '#FFFFFF',
    flex: 1,
    textAlign: 'center'
  },
  imageWide: {
    width: 320,
    height: 240,
    alignSelf: 'center'
  },
  content: {
    flex: 0.2,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 30,
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 7,
    marginTop: 15
  }
});

module.exports = EditMoment;
