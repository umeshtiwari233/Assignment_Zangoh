import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import StoryScreen from './src/component/StoryScreen';
import ProfileScreen from './src/component/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProfileScreen">
          <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
          <Stack.Screen name="StoryScreen" component={StoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
