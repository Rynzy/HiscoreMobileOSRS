import React from 'react';
import { Font } from 'expo';
import { StyleSheet, Text, View, Picker, TouchableOpacity, ScrollView } from 'react-native';
import { AsyncStorage, Image } from 'react-native';
import NumberFormat from 'react-number-format';

export default class CompareScores extends React.Component {
    skills = [
        require('./assets/skills/total.png'),
        require('./assets/skills/att.png'),
        require('./assets/skills/defence.png'),
        require('./assets/skills/str.png'),
        require('./assets/skills/hp.png'),
        require('./assets/skills/ranged.png'),
        require('./assets/skills/prayer.png'),
        require('./assets/skills/magic.png'),
        require('./assets/skills/cooking.png'),
        require('./assets/skills/wc.png'),
        require('./assets/skills/flet.png'),
        require('./assets/skills/fishing.png'),
        require('./assets/skills/fm.png'),
        require('./assets/skills/crafting.png'),
        require('./assets/skills/smithing.png'),
        require('./assets/skills/mining.png'),
        require('./assets/skills/herblore.png'),
        require('./assets/skills/agi.png'),
        require('./assets/skills/thieving.png'),
        require('./assets/skills/slayer.png'),
        require('./assets/skills/farming.png'),
        require('./assets/skills/rc.png'),
        require('./assets/skills/hunter.png'),
        require('./assets/skills/construction.png')
    ];

    updateFirst = (firstItem) => {
        this.setState({ firstItem: firstItem })
    }

    updateSecond = (secondItem) => {
        this.setState({ secondItem: secondItem })
    }

    componentDidMount() {
        AsyncStorage.getAllKeys().then((key) => {
            key.pop();
            this.setState({ files: key });
            this.setState({ firstItem: this.state.files[0] })
            this.setState({ secondItem: this.state.files[0] })
        });

        Font.loadAsync({
            'visitor': require('./assets/fonts/visitor.ttf'),
        });
        this.setState({ fontLoaded: true });
    }
    static navigationOptions = {
        title: 'Compare Progress',
    }

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            files: [],
            firstItem: '',
            secondItem: '',
            parsed1: {},
            parsed2: {},
            firstDataInNumbers: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            secondDataInNumbers: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            progressAmount: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            calculated: false
        }
    }

    render() {
        const state = this.state;

        return (
            this.state.fontLoaded ? (
                <ScrollView style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.text}>Select two dates</Text>
                        <View style={styles.pickContainer}>
                            <View style={styles.picker1}>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={this.state.firstItem}
                                    onValueChange={this.updateFirst}>
                                    {this.state.files.map((item, index) => {
                                        return (<Text style={styles.text} label={item} value={item} key={index} />)
                                    })}
                                </Picker>
                            </View>

                            <View style={styles.picker2}>
                                <Picker
                                    style={styles.picker2}
                                    mode="dropdown"
                                    selectedValue={this.state.secondItem}
                                    onValueChange={this.updateSecond}>
                                    {this.state.files.map((item, index) => {
                                        return (<Text style={styles.text} label={item} value={item} key={index} />)
                                    })}
                                </Picker>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={this.compareFiles.bind(this)}>
                            <Text style={styles.text}>Compare</Text>
                        </TouchableOpacity>
                        <View>
                            {this.Results()}
                        </View>
                    </View>
                </ScrollView>
            ) : null

        );

    }

    compareFiles() {
        AsyncStorage.getItem(this.state.firstItem).then((value) => {
            value = JSON.parse(value)
            this.setState({
                parsed1: value
            })
            AsyncStorage.getItem(this.state.secondItem).then((value2) => {
                value2 = JSON.parse(value2)
                this.setState({
                    parsed2: value2
                })
                this.parseFiles();
            })
        })
    }

    parseFiles() {
        let copyValues = this.state.firstDataInNumbers;
        for (let i = 0; i < copyValues.length; i++) {
            copyValues[i][2] = parseInt(this.state.parsed1[i].xp);
            copyValues[i][1] = parseInt(this.state.parsed1[i].level);
            copyValues[i][0] = parseInt(this.state.parsed1[i].rank);
        }

        let copyValues2 = this.state.secondDataInNumbers;
        for (let i = 0; i < copyValues2.length; i++) {
            copyValues2[i][2] = parseInt(this.state.parsed2[i].xp);
            copyValues2[i][1] = parseInt(this.state.parsed2[i].level);
            copyValues2[i][0] = parseInt(this.state.parsed2[i].rank);
        }

        let newProgress = this.state.progressAmount;
        for (let i = 0; i < newProgress.length; i++) {
            newProgress[i][2] = parseInt(copyValues2[i][2] - copyValues[i][2]);
            newProgress[i][1] = parseInt(copyValues2[i][1] - copyValues[i][1]);
            newProgress[i][0] = parseInt(copyValues[i][0] - copyValues2[i][0]);
        }

        this.setState({ calculated: true });

    }

    Results() {
        if (this.state.calculated) {
            let olderValues = this.state.firstDataInNumbers;
            let newValues = this.state.secondDataInNumbers;
            let imagePaths = this.skills;

            return this.state.progressAmount.map(function (news, i) {
                return (
                    <View key={i} style={styles.skillBox}>
                        <View style={styles.imageView}><Image source={imagePaths[i]} style={styles.imageStyle} />
                            <View style={styles.textBoxes}>
                                <View style={styles.descs}>
                                    <Text style={styles.descText}>Rank</Text>
                                    <Text style={styles.descText}>Level</Text>
                                    <Text style={styles.descText}>XP</Text>
                                </View>
                                <View style={styles.beginning}>

                                    <Text style={styles.skillText}>{olderValues[i][0]}</Text>
                                    <Text style={styles.skillText}>{olderValues[i][1]}</Text>
                                    <Text style={styles.skillText}>{olderValues[i][2]}</Text>
                                </View>
                                <View style={styles.ending}>
                                    <Text style={styles.skillText}>{newValues[i][0]}</Text>
                                    <Text style={styles.skillText}>{newValues[i][1]}</Text>
                                    <Text style={styles.skillText}>{newValues[i][2]}</Text>
                                </View>
                                <View style={styles.change}>
                                    <Text style={styles.skillText}>{news[0]}</Text>
                                    <Text style={styles.skillText}>{news[1]}</Text>
                                    <Text style={styles.skillText}>{news[2]}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                );
            });
        }
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    text: {
        textAlign: 'center',
        fontFamily: 'visitor',
        color: 'yellow',
        fontSize: 24
    },
    picker1: {
        backgroundColor: 'white',
        flex: 1,
        fontFamily: 'visitor',
        color: 'yellow',
    },
    picker2: {
        backgroundColor: 'white',
        flex: 1,
    },
    pickContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: 'yellow',
        marginTop: 10,
    },
    skillBox: {
        marginTop: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: 'yellow',
        backgroundColor: 'black',

    },
    beginning: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ending: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    change: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageStyle: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    imageView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    textBoxes: {
        flex: 1,
        textAlign: 'center',
    },
    descs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    descText: {
        textAlign: 'center',
        fontFamily: 'visitor',
        color: 'yellow',
    },
    skillText: {
        fontFamily: 'visitor',
        color: 'yellow',
    }
});