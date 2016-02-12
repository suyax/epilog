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


//autocomplete helper which can be passed to other components. so far passed to the edit moment and story components
var AutoCompleteHelper = React.createClass({
    
   getInitialState: function() {
        return {
          data: []
        };
    },

    //grabs autocomplete suggestions from external components (passed in as an array via props.data ) and filters the array based on
    //whats being typed in the autocomplete field
    onTyping: function (text) {
        // console.log("type of props.data -->", Array.isArray(this.props.data));
        var filteredArray = this.props.data.filter(function (element) {
            return element.toLowerCase().startsWith(text.toLowerCase())
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
                    onChange={this.props.onChange}
                    onEndEditing={this.props.onBlur}

                    suggestions={this.state.data}
                    placeholder= {this.props.placeholder}
                    style={styles.autocomplete}
                    clearButtonMode='always'
                    returnKeyType='go'
                    textAlign='center'
                    clearTextOnFocus={true}

                    maximumNumberOfAutoCompleteRows={5}
                    applyBoldEffectToAutoCompleteSuggestions={true}
                    reverseAutoCompleteSuggestionsBoldEffect={true}
                    showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
                    autoCompleteTableViewHidden={false}

                    autoCompleteTableBorderColor='lightblue'
                    autoCompleteTableBackgroundColor='azure'
                    autoCompleteTableCornerRadius={10}
                    autoCompleteTableBorderWidth={1}

                    autoCompleteRowHeight={30}

                    autoCompleteFontSize={15}
                    autoCompleteRegularFontName='Helvetica Neue'
                    autoCompleteBoldFontName='Helvetica Bold'
                    autoCompleteTableCellTextColor={'black'}
                />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    autocomplete: {
        fontFamily: 'Futura',
        alignSelf: 'stretch',
        height: 30,
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#fffaef',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        // marginBottom: 
        // marginTop: 

    }
});

module.exports = AutoCompleteHelper;
