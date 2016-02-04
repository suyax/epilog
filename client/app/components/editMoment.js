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

class EditMoment extends Component{

  submitMoment(textInputs, asset) {
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
  }


  render() {
    const {asset, onCancel, onSubmit} = this.props;
    var textFields = {};
    var image = asset.node.image;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.imageWide}/>
        </View>

        <View style={styles.content}>
          <View style={ styles.textContainer }>
            <TextInput style={styles.textInput} placeholder='Caption your moment'
              onChangeText={(text)=>textFields.caption = text}/>
            <TextInput style={styles.textInput} placeholder='Story title'
              onChangeText={(text)=>textFields.storyTitle = text}/>
          </View>
        </View>

        <View style={styles.buttonContainer}>

          <TouchableHighlight onPress={onCancel}>
            <View><Text style={styles.button}>Cancel</Text></View>
          </TouchableHighlight>

          <TouchableHighlight key={asset} onPress={() => {
              if (textFields.caption && textFields.storyTitle) {
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
};

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
    height: 10,
    borderRadius: 2,
    padding: 1,
    width: 350,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
    textAlign: 'center'
  },
  imageWide: {
    width: 320,
    height: 240,
    margin: 20,
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
