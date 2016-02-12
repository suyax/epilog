import React, {
  Component,
  CameraRoll,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';

import NavBar from './navBar';
import CameraRollView from './CameraRollView';
import externalStyles from '../style/external-styles.js';


const CAMERA_ROLL_VIEW = 'camera_roll_view';
const width = Dimensions.get('window').width;

class Capture extends Component {
  _renderImage(asset) {
    const imageStyle = [cameraRollStyles.image, {width: width*3/4, height: width/2}];
    const { onTouchImage } = this.props;
    return (
      <TouchableOpacity key={asset} onPress={()=>{
        onTouchImage(asset)}}>
        <View style={cameraRollStyles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={externalStyles.viewBody}>
        <View style={externalStyles.topBar}>
          <Text style={externalStyles.viewTitle}>
            Gallery
          </Text>
        </View>
        <View style={styles.container}>
          <CameraRollView
            ref={CAMERA_ROLL_VIEW}
            batchSize={20}
            groupTypes="All"
            renderImage={this._renderImage.bind(this)}
          />
        </View>
        <View style={styles.navBar}>
          <NavBar />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  content: {
    flex: 11,
  },
  navBar: {
    flex: 1,
    alignItems: 'center',
  },
});

var cameraRollStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  image: {
    marginLeft: width/8,
    marginRight: width/8,
    marginTop: width/16,
    marginBottom: width/16,
  },
  info: {
    flex: 1,
  },
})

module.exports = Capture;
