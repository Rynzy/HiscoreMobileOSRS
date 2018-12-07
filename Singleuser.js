import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { AppRegistry, TextInput } from 'react-native';
import {ScrollView} from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Singleuser extends React.Component {
    data = {
        overall: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        attack : {
          "rank": "",
          "level": "",
          "xp": ""
        },
        defence: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        strength: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        hitpoints: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        ranged: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        prayer: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        magic: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        cooking: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        woodcutting: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        fletching: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        fishing: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        firemaking: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        crafting: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        smithing: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        mining: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        herblore: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        agility: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        thieving: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        slayer: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        farming: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        runecraft: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        hunter: {
          "rank": "",
          "level": "",
          "xp": ""
        },
        construction: {
          "rank": "",
          "level": "",
          "xp": ""
        }
      };

  static navigationOptions = {
      title: 'Single Hiscore',
  }

  
  constructor(props) {
    super(props);
    this.state = {
        tableHead: ['Skill', 'Rank', 'Level', 'XP'],
        tableData: [
          ['Overall', '2', '3', '4'],
          ['Attack', 'b', 'c', 'd'],
          ['Defence', '2', '3', '456\n789'],
          ['Strength', 'b', 'c', 'd'],
          ['Hitpoints', 'b', 'c', 'd'],
          ['Ranged', 'b', 'c', 'd'],
          ['Prayer', 'b', 'c', 'd'],
          ['Magic', 'b', 'c', 'd'],
          ['Cooking', 'b', 'c', 'd'],
          ['Woodcutting', 'b', 'c', 'd'],
          ['Fletching', 'b', 'c', 'd'],
          ['Fishing', 'b', 'c', 'd'],
          ['Firemaking', 'b', 'c', 'd'],
          ['Crafting', 'b', 'c', 'd'],
          ['Smithing', 'b', 'c', 'd'],
          ['Mining', 'b', 'c', 'd'],
          ['Herblore', 'b', 'c', 'd'],
          ['Agility', 'b', 'c', 'd'],
          ['Thieving', 'b', 'c', 'd'],
          ['Slayer', 'b', 'c', 'd'],
          ['Farming', 'b', 'c', 'd'],
          ['Runecraft', 'b', 'c', 'd'],
          ['Hunter', 'b', 'c', 'd'],
          ['Construction', 'b', 'c', 'd']
        ],

        text: 'Username'
      }
  }



  render() {
    const state = this.state;
    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
        style={styles.searchContainer}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
        <Button
        onPress= {this.getOSRSHiscoreByName.bind(this)}
        title="Search hiscores"
        color="#841584"
      />
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
        </ScrollView>
    );


  }

  getOSRSHiscoreByName() {
    console.log('In func');
    console.log(this.state.tableData[0][0]);

    /*
              let newArray = [...this.state.tableData];
              newArray[i][3] = stringPiece;
              this.setState({tableData: newArray});
    */
    return fetch('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=Rynzy')
      .then(response => {

        var keys = Object.keys(this.data);
        var stringScores = response._bodyInit;
        var currentInput = ' ';
        var currentIndex = 0;
        var stringPiece = ' ';

      for(var i = 0; i < keys.length; i++) {
          for(var k = 0; k < 3; k++) {
            while(currentInput != ','  && currentInput!= '' && currentInput!= '\n' && currentIndex < stringScores.length) {
              stringPiece+= stringScores[currentIndex];
              currentInput = stringScores[currentIndex];
              currentIndex++;
            }
            stringPiece = stringPiece.replace(',', '');
            stringPiece = stringPiece.replace(' ', '');
           // console.log(k + ' | ' + stringPiece);
            if(k == 0 ) {
              this.data[keys[i]].rank = stringPiece;
              let newArray = [...this.state.tableData];
              newArray[i][0] = stringPiece;
              this.setState({tableData: newArray});
            }else if(k == 1) {
              this.data[keys[i]].level = stringPiece;
            }
            else if(k == 2) {
              this.data[keys[i]].xp = stringPiece;
            } 
            stringPiece = '';
            currentInput = 't';
          }

        } 
       
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
        margin: 6 
    },
    contentContainer: {
        paddingVertical: 20
      }
  });
