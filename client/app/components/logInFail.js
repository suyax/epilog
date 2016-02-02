'use strict'
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Modal,
  SwitchIOS
} from 'react-native';

class LogInFail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active:false}
  }

  _onFail() {
    this.setState({active: true});
  }

  _onSuccess() {
    this.setState({active: false});
  }

   render() {
     var colorStyle = {
       color: this.state.active ? '#fff' : '#000',
     };
     return (
       <TouchableHighlight
         onHideUnderlay={this._onFail.bind(this)}
         onPress={this.props.onPress}
         onShowUnderlay={this._onSuccess.bind(this)}
         style={[styles.button, this.props.style]}
         underlayColor="#a9d9d4">
           <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
       </TouchableHighlight>
     );
   }
 };

class ModalExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
       animated: true,
       modalVisible: false,
       transparent: false,
     }
  }

   _setModalVisible(visible) {
     this.setState({modalVisible: visible});
   }

   _toggleAnimated() {
     this.setState({animated: !this.state.animated});
   }

   _toggleTransparent() {
     this.setState({transparent: !this.state.transparent});
   }

   render() {
     var modalBackgroundStyle = {
       backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
     };
     var innerContainerTransparentStyle = this.state.transparent
       ? {backgroundColor: '#fff', padding: 20}
       : null;

     return (
       <View>
         <Modal
           animated={this.state.animated}
           transparent={this.state.transparent}
           visible={this.state.modalVisible}>
           <View style={[styles.container, modalBackgroundStyle]}>
             <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
               <Text>This modal was presented {this.state.animated ? 'with' : 'without'} animation.</Text>
               <LogInFail
                 onPress={this._setModalVisible.bind(this, false)}
                 style={styles.modalButton}>
                 Close
               </LogInFail>
             </View>
           </View>
         </Modal>

         <View style={styles.row}>
           <Text style={styles.rowTitle}>Animated</Text>
           <SwitchIOS value={this.state.animated} onValueChange={this._toggleAnimated.bind(this)} />
         </View>

         <View style={styles.row}>
           <Text style={styles.rowTitle}>Transparent</Text>
           <SwitchIOS value={this.state.transparent} onValueChange={this._toggleTransparent.bind(this)} />
         </View>

         <LogInFail onPress={this._setModalVisible.bind(this, true)}>
           Present
         </LogInFail>
       </View>
     );
   }
 };

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

module.exports = ModalExample;
