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


const CAMERA_ROLL_VIEW = 'camera_roll_view';

class Capture extends Component {

  _renderImage(asset) {
    const imageSize = 150;
    const imageStyle = [cameraRollStyles.image, {width: imageSize, height: imageSize}];
    const location = asset.node.location.longitude ?
      JSON.stringify(asset.node.location) : 'Unknown location';
    const { onTouchImage } = this.props;
    return (
      <TouchableOpacity key={asset} onPress={()=>{
        onTouchImage(asset); }}>
        <View style={cameraRollStyles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
          <View style={cameraRollStyles.info}>
            <Text style={cameraRollStyles.url}>{asset.node.image.uri}</Text>
            <Text>{location}</Text>
            <Text>{asset.node.group_name}</Text>
            <Text>{new Date(asset.node.timestamp).toString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Capture Page !
          </Text>
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
    flexDirection: 'column',
    backgroundColor:'#92A8D1',
  },
  content: {
    flex: 11,
  },
  navBar: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray'
  },
});

var cameraRollStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 4,
  },
  info: {
    flex: 1,
  },
})

module.exports = Capture


















