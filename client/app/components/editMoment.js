var React = require('react-native');
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
    var storyTitlesUrl = 'http://127.0.0.1:3000/api/stories';
    
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
            // console.log("arrayOfStoryTitles-->", this.state.arrayOfStoryTitles);
            // console.log("storyIdLookUp table -->", this.state.storyIdLookUp);
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
      var storyTagsUrl = 'http://127.0.0.1:3000/api/tags/' + storyId;

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
              // console.log(responseData);
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
    var storyTitle = textInputs.storyTitle;
    var momentCaption = textInputs.caption;
    var submitMomentURL = 'http://127.0.0.1:3000/api/stories/check';

    return AsyncStorage.getItem('token')
      .then((result) => {
        return fetch(submitMomentURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': result
          },
          body: JSON.stringify({
            caption: momentCaption,
            title: storyTitle
          })
        })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData) {
            var storyid = responseData.id;
            var title = storyTitle.split(' ').join('+');
            var caption = momentCaption.split(' ').join('+');
            var userid = responseData.users[0].id;

            AsyncStorage.getItem('token')
              .then((result) => {
                return {
                  uri: asset.node.image.uri,
                  uploadUrl: 'http://127.0.0.1:3000/api/moments',
                  fileName: title + '_' + caption + '_' + String(storyid) + '_' + String(userid) + '_.png',
                  mimeType: 'image',
                  headers: {
                    token: String(result)
                  }
                };
              })
              .then((result) => {
                NativeModules.FileTransfer.upload(result, (err, res) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(res);
                    return res;
                  }
                });
              })

            return 'HOME';
          }
          return 'NEW_STORY';
        })
        .catch((error) => {
          console.log(error);
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
        <AutoCompleteHelper 
          placeholder="Story Title" 
          data ={this.state.arrayOfStoryTitles} 
          onBlur={this.getStoryTags}
        />
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.imageWide}/>
        </View>
        <View style={ styles.textContainer }>
          <TextInput style={styles.textInput} placeholder='Create a Caption'
            onChangeText={(text)=>textFields.caption = text}/>
        </View>
        <AutoCompleteHelper placeholder="Add Tags" data={this.state.arrayOfStoryTags}/>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={onCancel}>
            <View><Text style={styles.button}>Cancel</Text></View>
          </TouchableHighlight>

          <TouchableHighlight key={asset} onPress={() => {
              if (textFields.caption && textFields.storyTitle && textFields.tags) {
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
    flex: 1
  },
  textInput: {
    alignSelf: 'center',
    height: 5,
    borderRadius: 2,
    padding: 1,
    width: 350,   
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
    flex: 0.3,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'space-around',
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
