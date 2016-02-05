var React = require('react-native');
const {
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

class Button extends Component{
  getInitialState() {
    return {
      active: false,
    };
  }

  _onHighlight() {
    this.setState({active: true});
  }

  _onUnhighlight() {
    this.setState({active: false});
  }

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

class MomentView extends Component{

  render (){
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };
    var innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20};

    <View>
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
      <Button onPress={this._setModalVisible.bind(this, true)}>
        Present
      </Button>
    </View>
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});
