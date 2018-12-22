import React from 'react';
import { StyleSheet, Text, View, FlatList, List } from 'react-native';
import { AppRegistry, TextInput, TouchableWithoutFeedback } from 'react-native';
import { AsyncStorage, Button } from 'react-native';


export default class SavedScores extends React.Component {

    componentDidMount() {
        AsyncStorage.getAllKeys().then((key) => {
            key.pop();
            this.setState({ files: key });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            edited: []
        }
        this.viewRow = this.viewRow.bind(this);
    }

    static navigationOptions = {
        title: 'Saved Scores',
    }


    render() {
        return (
            <View>
                <FlatList
                    data={this.state.files}
                    extraData={this.state.edited}
                    renderItem={({ item }) => (
                        <View style={styles.mediaWrapper}>
                            <Text>{item}</Text>
                            <TouchableWithoutFeedback style={styles.viewButton} onPress={() => this.viewRow(item)}><View style={styles.viewButtonInner}><Text>View</Text></View></TouchableWithoutFeedback>
                            <TouchableWithoutFeedback style={styles.removeButton} onPress={() => this.deleteRow(item)}><View style={styles.removeButtonInner}><Text>Delete</Text></View></TouchableWithoutFeedback>
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
    },
    contentContainer: {
        paddingVertical: 20
    },
    mediaWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",

        marginVertical: 3,
    },
    removeButton: {
        position: 'absolute',
        right: 0,
    },
    removeButtonInner: {
        backgroundColor: 'red',
    },
    viewButton: {

    },
    viewButtonInner: {
        backgroundColor: 'green',
    }
});
