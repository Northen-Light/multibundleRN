import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import BaseScreen from "./Screens/BaseScreen";
import HomeScreen from "./Screens/HomeScreen";

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();

const AppContainer = () => {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Base" component={BaseScreen}/>
      <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
}

export default AppContainer;
