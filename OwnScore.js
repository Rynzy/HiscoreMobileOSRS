import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { ScrollView, AsyncStorage, Image } from 'react-native';
import { Table, Row, Rows, Col, Cols } from 'react-native-table-component';
import { Font } from 'expo';
import NumberFormat from 'react-number-format';

export default class OwnScore extends React.Component {

    componentDidMount() {
        AsyncStorage.getItem("characterName").then(value => {
            this.setState({ characterName: value });
            this.getOSRSHiscoreByName();
        })

        Font.loadAsync({
            'visitor': require('./assets/fonts/visitor.ttf'),
        });
        this.setState({ fontLoaded: true });

    }
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
                [<View style={styles.imageView}><Image source={require('./assets/skills/total.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/att.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/defence.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/str.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/hp.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/ranged.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/prayer.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/magic.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/cooking.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/wc.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/flet.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/fishing.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/fm.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/crafting.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/smithing.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/mining.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/herblore.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/agi.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/thieving.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/slayer.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/farming.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/rc.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/hunter.png')} style={styles.imageStyle} /></View>, '', '', ''],
                [<View style={styles.imageView}><Image source={require('./assets/skills/construction.png')} style={styles.imageStyle} /></View>, '', '', '']
            ],
            characterName: '',
            fontLoaded: false
        }
    }


    render() {
        const state = this.state;
        return (
            this.state.fontLoaded ? (
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.text}>
                        Scores for user {this.state.characterName}
                    </Text>
                    <Table borderStyle={{ borderWidth: 2, borderColor: 'yellow' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={state.tableData} textStyle={styles.text} />
                    </Table>
                </ScrollView>
            ) : null
        );


    }

    getOSRSHiscoreByName() {
        return fetch('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=' + this.state.characterName)
            .then(response => {
                var keys = Object.keys(this.data);
                var stringScores = response._bodyInit;
                var currentInput = ' ';
                var currentIndex = 0;
                var stringPiece = ' ';

                for (var i = 0; i < keys.length; i++) {
                    for (var k = 1; k < 4; k++) {
                        while (currentInput != ',' && currentInput != '' && currentInput != '\n' && currentIndex < stringScores.length) {
                            stringPiece += stringScores[currentIndex];
                            currentInput = stringScores[currentIndex];
                            currentIndex++;
                        }
                        stringPiece = stringPiece.replace(',', '');
                        stringPiece = stringPiece.replace(' ', '');
                        if (k == 1) {
                            this.data[keys[i]].rank = stringPiece;
                            let newArray = [...this.state.tableData];
                            newArray[i][1] = stringPiece;
                        } else if (k == 2) {
                            this.data[keys[i]].level = stringPiece;
                        }
                        else if (k == 3) {
                            this.data[keys[i]].xp = stringPiece;
                        }
                        stringPiece = '';
                        currentInput = 't';
                    }

                }

                let copyValues = this.state.tableData;

                for (let i = 0; i < copyValues.length; i++) {
                    copyValues[i][3] = <NumberFormat value={parseInt(this.data[i].xp)} displayType={'text'} thousandSeparator={true} renderText={value => <Text style={styles.text}>{value}</Text>} />;
                    copyValues[i][2] = this.data[i].level;
                    copyValues[i][1] = <NumberFormat value={parseInt(this.data[i].rank)} displayType={'text'} thousandSeparator={true} renderText={value => <Text style={styles.text}>{value}</Text>} />;
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
    head: {
        height: 40,
        backgroundColor: 'black'
    },
    text: {
        textAlign: 'center',
        fontFamily: 'visitor',
        color: 'yellow',
    },
    contentContainer: {
        backgroundColor: 'black'
    },
    imageStyle: {
        width: 25,
        height: 25,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
