import React, {
  Component,
  CameraRoll,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import NavBar from './navBar';
import CameraRollView from './CameraRollView';
import externalStyles from '../style/external-styles.js';


const CAMERA_ROLL_VIEW = 'camera_roll_view';

class Capture extends Component {
  _renderImage(asset) {
    const imageSize = 120;
    const imageStyle = [cameraRollStyles.image, {width: imageSize, height: imageSize}];
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
        <View style={externalStyles.viewBody}>
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
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#92A8D1',
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
    width: 130,
  },
  image: {
    margin: 2,
  },
  info: {
    flex: 1,
  },
})

module.exports = Capture;
