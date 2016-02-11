import React, {
  Component,
  Image,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import NavBar from './navBar';
import moment from 'moment';
import externalStyles from '../style/external-styles.js';

class Home extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { updates, onLogOut, onPress, onCamera} = this.props;

    if (updates.loading || !updates.lastUpdated) {
      return this.renderLoadingView();
    }

    return (
      <View style={externalStyles.viewBody}>
        <View style={externalStyles.topBar}>
          <Text style={externalStyles.viewTitle}>
            Home
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.positionBox}>
            <RecyclerViewBackedScrollView style={styles.list}>
              <View style = {styles.listView}>
                {updates.data.map(
                  (update) => {
                    return this.renderRecentMoment(update);
                  })
                }
              </View>
            </RecyclerViewBackedScrollView>
          </View>
          <TouchableHighlight
            style={styles.navBar}
            onPress={onCamera}>
              <Image
                style={styles.icon}
                source={require('../image/CameraIcon.png')}/>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.navBar}
            onPress={onLogOut}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Log Out</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.navBar}>
          <NavBar />
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <Text>
            Loading Recent Update Moments...
          </Text>
        </View>
        <View style={styles.navBar}>
          <NavBar />
        </View>
      </View>
    );
  }

  renderRecentMoment(update) {
    return (
      <View key={update.id} style={styles.container}>
        <View style={styles.storyContainer}>
            <View style={styles.timeBox}>
              <Text style={styles.text}>{moment(update.updatedAt).fromNow()}
              </Text>
            </View>
          <TouchableHighlight onPress={()=>{this.props.onPress(update)}}>
            <Image
              source={{uri: update.url}}
              style={externalStyles.rectangleThumbnail}>
            </Image>
            </TouchableHighlight>
            <View style={styles.textBox}>
              <Text style={externalStyles.contentText}>
                {update.caption}
              </Text>
            </View>
        </View>
        <View style={externalStyles.timeLine}>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  storyContainer: {
    padding: 2,
    margin: 2,
    alignItems: 'center',
    height: 135,
    width: Dimensions.get('window').width,
    flexDirection: 'row'
  },
  thumbnail: {
    alignSelf:'center',
    width: 200,
    height: 150,
  },
  headline: {
    width: 100,
    padding: 10,
    fontSize: 20,
    height:150,
    textAlign: 'left',
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'white',
  },
  list: {
    flex: 9,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor:'#fffaef',
  },
  content: {
    flex: 9,
    justifyContent: 'center',
  },
  navBar: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: ' #2C3539'
  },
  icon: {
    width: 50,
    height: 50,
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: 100,
    backgroundColor: 'white',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
  },
  positionBox: {
    flex: 10
  },
  text:{
    textAlign: 'center',
    fontSize: 10,
    color: ' #5379ae',
    marginRight: 4,
  },
  textBox: {
    flexDirection: 'column',
    width: 120,
  },
  timeBox: {
    marginLeft: 8,
    marginRight: 8,
  }
});

module.exports = Home;

