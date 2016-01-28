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
} = React;

class EditMoment extends Component{

  render() {
    const {asset} = this.props;
    var image = asset.node.image;
    return (
      <ScrollView>
        <View style={styles.row}>
          <Image source={image} style={styles.imageWide}/>
        </View>
        <View style={styles.row}>
          <TouchableHighlight>
            <View><Text>Submit</Text></View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View><Text>Cancel</Text></View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
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
