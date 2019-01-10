import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { AppRegistry, ScrollView, AsyncStorage} from 'react-native';
import { Table, Row, Rows, Col, Cols} from 'react-native-table-component';
import { Font } from 'expo';
import NumberFormat from 'react-number-format';

export default class OldScore extends React.Component {

    componentDidMount() {
        AsyncStorage.getItem(this.state.file).then(value => {
            value = JSON.parse(value)
            this.setState({
                parsed: value
            })
        })

        Font.loadAsync({
            'visitor': require('./assets/fonts/visitor.ttf'),
          });
          this.setState({ fontLoaded: true });
    }

    static navigationOptions = {
        title: 'Old Score',
    }

    constructor(props) {
        super(props);
        const { navigation } = this.props;
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

            file: navigation.getParam('file', 'empty'),
            parsed: {},
            processing: false,
            fontLoaded: false
        }

        this.fetchOldData = this.fetchOldData.bind(this);
    }


    fetchOldData(value) {

        let copyValues = this.state.tableData;
        for (let i = 0; i < copyValues.length; i++) {
            copyValues[i][3] = <NumberFormat value={parseInt(value[i].xp)} displayType={'text'} thousandSeparator={true} renderText={value => <Text style={styles.text}>{value}</Text>} />
            copyValues[i][2] = value[i].level;
            copyValues[i][1] = <NumberFormat value={parseInt(value[i].rank)} displayType={'text'} thousandSeparator={true} renderText={value => <Text style={styles.text}>{value}</Text>} />
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
            this.state.fontLoaded ? (
            <ScrollView style={styles.contentContainer}>
                <Text style={styles.textTitle}>
                    Scores in {this.state.file}
                </Text>
                <Table borderStyle={{ borderWidth: 2, borderColor: 'yellow' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={state.tableData} textStyle={styles.text} />
                </Table>
            </ScrollView>
            ) : null
        );

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
    textTitle: {
        textAlign: 'center',
        fontFamily: 'visitor',
        color: 'yellow',
        fontSize:24,
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
