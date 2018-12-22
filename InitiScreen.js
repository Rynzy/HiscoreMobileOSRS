import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, AsyncStorage} from 'react-native';

export default class InitScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        text: 'Zezima'
      }
  }



  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>
        <Text style={styles.titleText}>
            Character Name
        </Text>
        <TextInput
        style={styles.searchContainer}
        onChangeText={(text) => this.setState({text})}
        
        placeholder = 'username'
      />


      <View style={styles.bottom}>
        <Button
        style = {styles.button}
        onPress={() => this.save('characterName', this.state.text)}
        title="Accept"
        color="#841584"/>
    </View>

    </View>
      
    );
  }

  save(key, value) {
    AsyncStorage.setItem(key, JSON.stringify(value), () => {
        console.log('Saved with key ' + key + ' value ' + value);
    });

    const {navigate} = this.props.navigation;
  navigate('First');

  }

}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 40,
      },
      button: {
        position: 'absolute',
        bottom:0,
      },
      bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
      }
  });
