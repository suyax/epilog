'use strict';

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
  NativeModules
} = React;

class EditMoment extends Component{

  render() {
    const {asset, onCancel, onSumbit} = this.props;
    var image = asset.node.image;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.imageWide}/>
        </View>

        <View style={styles.content}>
          <View style={ styles.textContainer }>
            <TextInput style={ styles.textInput }/>
            <TextInput style={ styles.textInput }/>
            <TextInput style={ styles.textInput }/>
          </View>
        </View>

        <View style={styles.buttonContainer}>

          <TouchableHighlight onPress={onCancel}>
            <View><Text style={styles.button}>Cancel</Text></View>
          </TouchableHighlight>

          <TouchableHighlight key={asset} onPress={() => {
              NativeModules.ReadImageData.readImage(image.uri, (image) => {
                fetch('http://127.0.0.1:3000/api/moments/3', {
                  method: 'POST',
                  headers: {
                    'momentData': JSON.stringify({
                      'caption': 'test caption for moment',
                      'storyid': 3,
                    }),
                    'content-type': 'image/jpeg'
                  },
                  body: image
                })
              });

              this.props.onTouchImage(asset);
            }
          }>
            <View><Text style={styles.button}>Submit</Text></View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // NativeModules.ReadImageData.readImage(image url (image) => {
  //   console.log(image);
  // });


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
