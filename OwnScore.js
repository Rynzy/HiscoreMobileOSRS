import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { AppRegistry, TextInput } from 'react-native';
import { ScrollView, AsyncStorage } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class OwnScore extends React.Component {

    componentDidMount() {
        AsyncStorage.getItem("characterName").then(value => {
            this.setState({ characterName: value });
            this.getOSRSHiscoreByName();
        })

    }

    skills = ['Overall', 'Attack', 'Defence', 'Strength',
        'Hitpoints', 'Ranged', 'Prayer', 'Magic', 'Cooking',
        'Woodcutting', 'Fletching', 'Fishing', 'Firemaking',
        'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility',
        'Thieving', 'Slayer', 'Farming', 'Runecraft', 'Hunter', 'Construction'];
    data = [
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        },
        {
            "rank": "",
            "level": "",
            "xp": ""
        }
    ];

    static navigationOptions = {
        title: 'Own Hiscore',
    }


    constructor(props) {
        super(props);
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

            characterName: ''
        }
    }



    render() {
        const state = this.state;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.text}>
                    Scores for user {this.state.characterName}
                </Text>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={state.tableData} textStyle={styles.text} />
                </Table>
            </ScrollView>
        );


    }

    getOSRSHiscoreByName() {

        console.log(this.state.characterName);
        return fetch('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=' + this.state.characterName)
            .then(response => {

                var keys = Object.keys(this.data);
                var stringScores = response._bodyInit;
                var currentInput = ' ';
                var currentIndex = 0;
                var stringPiece = ' ';

                for (var i = 0; i < keys.length; i++) {
                    for (var k = 0; k < 3; k++) {
                        while (currentInput != ',' && currentInput != '' && currentInput != '\n' && currentIndex < stringScores.length) {
                            stringPiece += stringScores[currentIndex];
                            currentInput = stringScores[currentIndex];
                            currentIndex++;
                        }
                        stringPiece = stringPiece.replace(',', '');
                        stringPiece = stringPiece.replace(' ', '');
                        if (k == 0) {
                            this.data[keys[i]].rank = stringPiece;
                            let newArray = [...this.state.tableData];
                            newArray[i][0] = stringPiece;
                        } else if (k == 1) {
                            this.data[keys[i]].level = stringPiece;
                        }
                        else if (k == 2) {
                            this.data[keys[i]].xp = stringPiece;
                        }
                        stringPiece = '';
                        currentInput = 't';
                    }

                }

                let copyValues = this.state.tableData;

                for (let i = 0; i < copyValues.length; i++) {
                    copyValues[i][3] = this.data[i].xp;
                    copyValues[i][2] = this.data[i].level;
                    copyValues[i][1] = this.data[i].rank;
                    copyValues[i][0] = this.skills[i];
                }

                this.setState({
                    tableData: copyValues
                })

                var date = new Date().getDate();
                var month = new Date().getMonth() + 1;
                var year = new Date().getFullYear();
                let completeDate = (date + '-' + month + '-' + year);

                AsyncStorage.getItem(completeDate)
                    .then(value => {

                        if (value) {
                        } else {
                            const stringifiedArray = JSON.stringify(this.data)
                            AsyncStorage.setItem(completeDate, stringifiedArray);
                        }
                    })



                return response;


            })
            .catch((error) => {
                console.error(error);
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
    }
});
