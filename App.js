import React from 'react';
import Startscreen from './Startscreen.js';
import Singleuser from './Singleuser.js';
import OwnScore from './OwnScore.js';
import SavedScores from './SavedScores.js';
import OldScore from './OldScore.js';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';


const App = createStackNavigator({
  First: { screen: Startscreen },
  HiscoreUser: { screen: Singleuser },
  OwnScore: { screen: OwnScore },
  SavedScores: { screen: SavedScores },
  OldScore: { screen: OldScore },
});

const AppContainer = createAppContainer(App);

export default AppContainer; 