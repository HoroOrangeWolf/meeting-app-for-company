import React, {useState, useEffect} from 'react';
import { Text } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Home';
import Scanner from '../Scanner';
import LogOut from '../LogOut/LogOut';
import AddMeeting from '../AddMeeting';
import { useGlobalContext } from '../GlobalContext';

const DrawerNav = createDrawerNavigator();



const MainScreen = () => {

  const {isAdmin} = useGlobalContext();

  return (
    
      <DrawerNav.Navigator initialRouteName="Home">
        <DrawerNav.Screen name="Home" component={Home} />
        {isAdmin() && <DrawerNav.Screen name="Dodaj Spotkanie" component={AddMeeting} />}
        <DrawerNav.Screen name="Zeskanuj kod QR" component={Scanner} />
        <DrawerNav.Screen name="Wyloguj" component={LogOut} />
      </DrawerNav.Navigator>
    
  )
}

export default MainScreen;