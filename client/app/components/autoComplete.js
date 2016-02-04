'use strict';
 
var AutoComplete = require('react-native-autocomplete');
var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    AlertIOS
} = React;

var AutoCompleteHelper = React.createClass({
    
  
    getInitialState: function() {
        return {data: []};
    },

    onTyping: function (text) {

        var filteredArray = arrayToFilter.filter(function (element) {
            return element.toLowerCase().startsWith(text.toLowerCase())
        }).map(function (element) {
            return element;
        });

        this.setState({
            data:  filteredArray
        });
    },

    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                </Text>
                <AutoComplete
                    //probably don't need all of this; scrub through later!!
                    onTyping={this.onTyping}
                    // onSelect={(e) => AlertIOS.alert('You choosed', e)}
                    onBlur={() => AlertIOS.alert('Blur')}
                    onFocus={() => AlertIOS.alert('Focus')}
                    onSubmitEditing={(e) => AlertIOS.alert('onSubmitEditing')}
                    onEndEditing={(e) => AlertIOS.alert('onEndEditing')}

                    suggestions={this.state.data}

                    style={styles.autocomplete}
                    clearButtonMode='always'
                    returnKeyType='go'
                    textAlign='center'
                    clearTextOnFocus={true}

                    maximumNumberOfAutoCompleteRows={10}
                    applyBoldEffectToAutoCompleteSuggestions={true}
                    reverseAutoCompleteSuggestionsBoldEffect={true}
                    showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
                    autoCompleteTableViewHidden={false}

                    autoCompleteTableBorderColor='lightblue'
                    autoCompleteTableBackgroundColor='azure'
                    autoCompleteTableCornerRadius={10}
                    autoCompleteTableBorderWidth={1}

                    autoCompleteRowHeight={35}

                    autoCompleteFontSize={15}
                    autoCompleteRegularFontName='Helvetica Neue'
                    autoCompleteBoldFontName='Helvetica Bold'
                    autoCompleteTableCellTextColor={'red'}
                />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    autocomplete: {
        alignSelf: 'stretch',
        height: 50,
        backgroundColor: '#FFF',
        borderColor: 'lightblue',
        borderWidth: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 50,

    }
});

module.exports = AutoCompleteHelper;
