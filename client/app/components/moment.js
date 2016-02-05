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
  Modal,
} = React;

class MomentView extends Component{
  render (){
    <Image />
    <Modal
      animated={true}
      transparent={true}
      visible={this.state.modalVisible}>
      <View style={[styles.container, modalBackgroundStyle]}>
        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
          <Text>This modal was presented {this.state.animated ? 'with' : 'without'} animation.</Text>
          <Button
            onPress={this._setModalVisible.bind(this, false)}
            style={styles.modalButton}>
            Close
          </Button>
        </View>
      </View>
    </Modal>
  }
}
