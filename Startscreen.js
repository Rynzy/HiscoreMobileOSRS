import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, AsyncStorage, TextInput } from 'react-native';

class InitScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: 'Rynzy',
      firstLaunch: null
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Character Name
        </Text>
        <TextInput
          style={styles.searchContainer}
          onChangeText={(text) => this.setState({ text })}
          placeholder='Rynzy'
        />


        <View style={styles.bottom}>
          <Button
            style={styles.button}
            onPress={() => this.save('characterName', this.state.text)}
            title="Accept"
            color="#841584" />
        </View>

      </View>

    );
  }

  save(key, value) {
    AsyncStorage.setItem(key, JSON.stringify(value), () => {
      console.log('Saved with key ' + key + ' value ' + value);
      this.setState({ firstLaunch: false });
      console.log(this.state.firstLaunch);
    });
  }

}

export default class Startscreen extends React.Component {
  static navigationOptions = {
    title: 'Home screen',
  }

  constructor() {
    super();
    this.state = { firstLaunch: null };
  }

  componentDidMount() {

    this.interval = setInterval(() => AsyncStorage.getItem("characterName").then(value => {
      if (value == null) {
        this.setState({ firstLaunch: true });
      }
      else {
        this.setState({ firstLaunch: false });
      }
    }), 1000);


  }




  render() {
    const { navigate } = this.props.navigation;

    if (this.state.firstLaunch === null) {
      return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user.
    } else if (this.state.firstLaunch == true && this.props.firstLaunch == null) {
      return <InitScreen />;
    } else {
      return (
        <View style={styles.container}>
          <Button
            onPress={() => navigate('HiscoreUser')}
            title="Search Hiscores with username"
            color="#841584"
          />
          <Button
            onPress={() => navigate('OwnScore')}
            title="Check own hiscores"
            color="#841584"
          />
          <Button
            onPress={() => navigate('SavedScores')}
            title="Saved scores"
            color="#841584"
          />
          <Button
            onPress={() => this.removeEverything()}
            title="Remove everything"
            color="#841584"
          />
        </View>
      );
    }


  }

  removeEverything() {
    console.log('HHEH');
    AsyncStorage.clear();
    this.setState({ firstLaunch: true });


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
