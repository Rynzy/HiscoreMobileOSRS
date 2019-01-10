import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AsyncStorage, TextInput, TouchableOpacity } from 'react-native';
import { Font } from 'expo';


class InitScreen extends React.Component {

  componentDidMount() {
    Font.loadAsync({
      'visitor': require('./assets/fonts/visitor.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  constructor(props) {
    super(props);
    this.state = {
      text: 'Upi',
      firstLaunch: null,
      fontLoaded: false
    }
  }

  render() {

    return (
      this.state.fontLoaded ? (
        <View style={styles.container}>
          <Text style={styles.fontStyle}>
            Character Name
        </Text>

          <TextInput
            style={styles.inputField}
            onChangeText={(text) => this.setState({ text })}
            placeholder='RSN'
          />
          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.save('characterName', this.state.text)}>
              <Text style={styles.fontStyle}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null
    );
  }

  save(key, value) {
    AsyncStorage.setItem(key, JSON.stringify(value), () => {
      this.setState({ firstLaunch: false });
    });
  }

}

export default class Startscreen extends React.Component {
  static navigationOptions = {
    title: 'Home screen',
  }

  constructor() {
    super();
    this.state = {
      firstLaunch: null,
      fontLoaded: false
    };
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

    Font.loadAsync({
      'visitor': require('./assets/fonts/visitor.ttf'),
    });
    this.setState({ fontLoaded: true });

  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.firstLaunch === null) {
      return null;
    } else if (this.state.firstLaunch == true && this.props.firstLaunch == null) {
      return <InitScreen />;
    } else {
      return (
        this.state.fontLoaded ? (
          <View style={styles.container}>

            <Text style={styles.titleFont}>OSRS Tracker</Text>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigate('HiscoreUser')}>
              <Text style={styles.fontStyle}>Search hiscores</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigate('OwnScore')}>
              <Text style={styles.fontStyle}>Check own hiscores</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigate('SavedScores')}>
              <Text style={styles.fontStyle}>Saved scores</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigate('CompareScores')}>
              <Text style={styles.fontStyle}>Compare progress</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.removeEverything()}>
              <Text style={styles.fontStyle}>Remove everything</Text>
            </TouchableOpacity>
          </View>
        ) : null
      );
    }
  }

  removeEverything() {
    AsyncStorage.clear();
    this.setState({ firstLaunch: true });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  fontStyle: {
    fontFamily: 'visitor',
    fontSize: 38,
    color: 'yellow',
    textAlign: 'center'
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'yellow',
    marginTop: 10,
  },
  inputField: {
    backgroundColor: 'white',
  },
  titleFont: {
    fontFamily: 'visitor',
    fontSize: 48,
    color: 'yellow',
    textAlign: 'center'
  }
});
