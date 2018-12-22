import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { AppRegistry, TextInput } from 'react-native';
import { ScrollView, AsyncStorage } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class OldScore extends React.Component {



    componentDidMount() {
        console.log('Filu');
        console.log(this.state.file)
        AsyncStorage.getItem(this.state.file).then(value => {
            value = JSON.parse(value)
            this.setState({
                parsed: value
            })
        })
    }

    skills = ['Overall', 'Attack', 'Defence', 'Strength',
        'Hitpoints', 'Ranged', 'Prayer', 'Magic', 'Cooking',
        'Woodcutting', 'Fletching', 'Fishing', 'Firemaking',
        'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility',
        'Thieving', 'Slayer', 'Farming', 'Runecraft', 'Hunter', 'Construction'];

    static navigationOptions = {
        title: 'Old Score',
    }



    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            tableHead: ['Skill', 'Rank', 'Level', 'XP'],
            tableData: [
                ['Overall', '', '', ''],
                ['Attack', '', '', ''],
                ['Defence', '', '', ''],
                ['Strength', '', '', ''],
                ['Hitpoints', '', '', ''],
                ['Ranged', '', '', ''],
                ['Prayer', '', '', ''],
                ['Magic', '', '', ''],
                ['Cooking', '', '', ''],
                ['Woodcutting', '', '', ''],
                ['Fletching', '', '', ''],
                ['Fishing', '', '', ''],
                ['Firemaking', '', '', ''],
                ['Crafting', '', '', ''],
                ['Smithing', '', '', ''],
                ['Mining', '', '', ''],
                ['Herblore', '', '', ''],
                ['Agility', '', '', ''],
                ['Thieving', '', '', ''],
                ['Slayer', '', '', ''],
                ['Farming', '', '', ''],
                ['Runecraft', '', '', ''],
                ['Hunter', '', '', ''],
                ['Construction', '', '', '']
            ],

            file: navigation.getParam('file', 'empty'),
            parsed: {},
            processing: false
        }

        this.fetchOldData = this.fetchOldData.bind(this);
    }


    fetchOldData(value) {

        let copyValues = this.state.tableData;
        for (let i = 0; i < copyValues.length; i++) {
            console.log(i + '. ' + value[i].xp);
            copyValues[i][3] = value[i].xp;
            copyValues[i][2] = value[i].level;
            copyValues[i][1] = value[i].rank;
            copyValues[i][0] = this.skills[i];
        }

    }

    render() {
        const { navigate } = this.props.navigation;
        const state = this.state;

        let value = this.state.parsed;
        if (value.length == 24) {
            this.fetchOldData(value);
        }
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.text}>
                    Scores in {this.state.file}
                </Text>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={state.tableData} textStyle={styles.text} />
                </Table>
            </ScrollView>
        );

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
    }
});
