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

class Home extends Component {
  componentDidMount() {
    this.props.onLoad();

  }
  render() {
    const { updates, onLogOut, onCamera} = this.props;
    if (updates.loading || !updates.lastUpdated) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.container}>
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
      <View
        key={update.id}
      >
          <View style={styles.storyContainer}>
              <View style={styles.timeBox}>
                <Text style={styles.text}>{moment(update.updatedAt).fromNow()}
                </Text>
              </View>
              <View style={styles.imageBox}>
                <Image
                  source={{uri: update.url}}
                  style={styles.thumbnail}
                >
        <TouchableHighlight
          onPress={()=>{this.props.onTouchImage(update)}}
          onShowUnderlay={this.onHighlight}
          onHideUnderlay={this.onUnhighlight}>
              <View style={styles.titleBox}>
              </View>
        </TouchableHighlight>
              </Image>
              </View>
              <View style={styles.groupBox}>
              <Text style={styles.headline}>
              {update.caption}
              </Text>
              </View>
          </View>
        <Image
        style={styles.timeLine}
        source={require('../image/greyLine.png')}
        >
        </Image>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  timeLine: {
    flex:1,
    marginLeft: 40,
    alignSelf:'stretch',
    width:2,
    height: 100,
  },
  storyContainer: {
    padding: 5,
    margin: 5,
    alignItems: 'center',
    height: 135,
    width: Dimensions.get('window').width,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    marginBottom: 8,
    alignItems: 'center',
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
    flex: 11,
  },
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
  navBar: {
    flex: 1,
    alignItems: 'center',
  },
});

module.exports = Home;

