
import React from 'react';

import {
  NativeBaseProvider,
} from 'native-base';

import GlobalContext from './GlobalContext';
import { NavigationContainer } from '@react-navigation/native';

import Main from './Main';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {

  
  return (

    <NativeBaseProvider>
      <NavigationContainer>
        <GlobalContext>
            <Main/>
        </GlobalContext>
      </NavigationContainer>
    </NativeBaseProvider>
  
  );
}
