import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { AppRegistry, TextInput } from 'react-native';
import { ScrollView, Alert } from 'react-native';
import { FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Font } from 'expo';
import NumberFormat from 'react-number-format';
import { Image } from 'react-native';

export default class Singleuser extends React.Component {

  componentDidMount() {
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
    title: 'Single Hiscore',
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

      text: '',
      fontLoaded: false
    }
  }



  render() {
    const state = this.state;
    return (
      this.state.fontLoaded ? (
        <ScrollView style={styles.contentContainer}>
          <TextInput
            style={styles.searchContainer}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            placeholder='username'
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.getOSRSHiscoreByName.bind(this)}>
            <Text style={styles.text}>Search hiscores</Text>
          </TouchableOpacity>


          <Table borderStyle={{ borderWidth: 2, borderColor: 'yellow' }}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        </ScrollView>
      ) : null
    );


  }

  fetchStatusHandler(response) {

    if (response.status === 200) {
      return response;
    } else {
      throw new Error();
    }
  }

  getOSRSHiscoreByName() {

    return fetch('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=' + this.state.text)
      .then(this.fetchStatusHandler)
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
          if (this.data[i].rank === "-1") {
            copyValues[i][3] = '';
            copyValues[i][2] = '';
            copyValues[i][1] = '';
            copyValues[i][0] = copyValues[i][0];
          } else {
            copyValues[i][3] = <NumberFormat value={parseInt(this.data[i].xp)} displayType={'text'} thousandSeparator={true} renderText={value => <Text style={styles.text}>{value}</Text>} />;
            copyValues[i][2] = this.data[i].level;
            copyValues[i][1] = <NumberFormat value={parseInt(this.data[i].rank)} displayType={'text'} thousandSeparator={true} renderText={value => <Text style={styles.text}>{value}</Text>} />;

            copyValues[i][0] = copyValues[i][0];
          }
        }

        this.setState({
          tableData: copyValues
        })


        return response;


      })
      .catch((error) => {
        Alert.alert('No player ' + this.state.text + ' found');
      });
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    textAlignVertical: 'top',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'black'
  },
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
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'yellow',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
