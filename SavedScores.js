import React from 'react';
import { StyleSheet, Text, View, FlatList, List } from 'react-native';
import { AppRegistry, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { AsyncStorage, Button } from 'react-native';
import { Image } from 'react-native';
import { Font } from 'expo';
export default class SavedScores extends React.Component {

    componentDidMount() {
        AsyncStorage.getAllKeys().then((key) => {
            key.pop();
            this.setState({ files: key });
        });

        Font.loadAsync({
            'visitor': require('./assets/fonts/visitor.ttf'),
        });
        this.setState({ fontLoaded: true });

    }

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            edited: [],
            fontLoaded: false
        }
        this.viewRow = this.viewRow.bind(this);
    }

    static navigationOptions = {
        title: 'Saved Scores',
    }


    render() {
        return (
            <View style={styles.contentContainer}>
                <FlatList
                    data={this.state.files}
                    extraData={this.state.edited}
                    renderItem={({ item }) => (
                        <View style={styles.mediaWrapper}>
                            <Text style={styles.text}>{item}</Text>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() => this.viewRow(item)}>
                                <View style={styles.viewButtonInner}><Text style={styles.text}>View</Text></View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() => this.deleteRow(item)}>
                                <View style={styles.removeButtonInner}><Text style={styles.text}>Delete</Text></View>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item}
                />
            </View>

        );


    }

    deleteRow(item) {
        let copyValues = this.state.files;
        let indexRemove = 0;
        for (let i = 0; i < copyValues.length; i++) {
            if (item == copyValues[i]) {
                copyValues.splice(i, 1);
            }
        }
        AsyncStorage.removeItem(item).then(() => {
            this.setState({
                edited: copyValues
            })
        });
    }

    viewRow(item) {
        const { navigate } = this.props.navigation;
        navigate('OldScore', {
            file: item,
        });
    }

}

const styles = StyleSheet.create({
    searchContainer: {
        textAlignVertical: 'top',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        textAlign: 'center',
        fontFamily: 'visitor',
        color: 'yellow',
        fontSize: 24,
    },
    contentContainer: {
        paddingVertical: 20
    },
    mediaWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 3,
        borderWidth: 1,
        borderColor: 'yellow'
    },
    removeButton: {
        position: 'absolute',
        right: 0,
    },
    removeButtonInner: {
    },
    viewButton: {

    },
    viewButtonInner: {
    },
    contentContainer: {
        backgroundColor: 'black',
        flex: 1
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: 'yellow',
      },
});
