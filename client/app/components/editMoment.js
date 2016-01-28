'use strict';

var React = require('react-native');
var {
  Component,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  NativeModules
} = React;

class EditMoment extends Component{

  render() {
    const {asset, onCancel, onSumbit} = this.props;
    var image = asset.node.image;
    console.log(image);
    return (
      <ScrollView>
        <View style={styles.row}>
          <Image source={image} style={styles.imageWide}/>
        </View>
        <View style={styles.row}>
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
              })
            }
          }>
            <View><Text>Submit</Text></View>
          </TouchableHighlight>
          <TouchableHighlight onPress={onCancel}>
            <View><Text>Cancel</Text></View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }

  // NativeModules.ReadImageData.readImage(image url (image) => {
  //   console.log(image);
  // });


};

var styles = StyleSheet.create({
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
  imageWide: {
    borderWidth: 1,
    borderColor: 'black',
    width: 320,
    height: 240,
    margin: 5,
  },
});

module.exports = EditMoment;
