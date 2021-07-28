import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './src/navigation/StackNavigation';
import {Tabs} from './src/navigation/Tabs';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
