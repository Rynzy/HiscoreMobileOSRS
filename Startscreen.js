import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

export default class Startscreen extends React.Component {
  static navigationOptions = {
      title: 'Home screen',
  }




  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>
        <Button
        onPress={() => navigate('HiscoreUser')}
        title="Search Hiscores with username"
        color="#841584"
      />
      </View>
    );
  }

  searchByName() {
    const {navigate} = this.props.navigation;
      console.log('wtf');
    navigate('HiscoreUser');
}
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20
    },
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });
