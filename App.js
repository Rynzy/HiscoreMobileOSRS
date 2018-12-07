import React from 'react';
import Startscreen from './Startscreen.js';
import Singleuser from './Singleuser.js';

import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';


const App = createStackNavigator({
  First: { screen: Startscreen },
  HiscoreUser: {screen: Singleuser},
});

const AppContainer = createAppContainer(App);

export default AppContainer; 