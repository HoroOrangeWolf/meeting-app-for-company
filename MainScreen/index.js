import React, {useState, useEffect} from 'react';
import { Text, Button, Icon } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../Home';
import Scanner from '../Scanner';
import LogOut from '../LogOut/LogOut';
import AddMeeting from '../AddMeeting';
import { useGlobalContext } from '../GlobalContext';
import Users from '../Users';
import AddUser from '../Users/AddUser';

const DrawerNav = createDrawerNavigator();


const MainScreen = () => {

  const {isAdmin} = useGlobalContext();

  return (
    
      <DrawerNav.Navigator initialRouteName="Home">
        <DrawerNav.Screen name="Home" component={Home} options={{headerTitle: 'Główna'}} />
        {isAdmin() && <DrawerNav.Screen name="Dodaj Spotkanie" component={AddMeeting} />}
        {isAdmin() && <DrawerNav.Screen name="User" component={Users} options={{headerTitle: 'Użytkownicy', title: 'Użytkownicy'}}/>}
        <DrawerNav.Screen name="Zeskanuj kod QR" component={Scanner} />
        <DrawerNav.Screen name="Wyloguj" component={LogOut} />
        {isAdmin() && <DrawerNav.Screen name="addUsers" component={AddUser} options={{
          drawerItemStyle: {height: 0, margin: 0},
          headerTitle: 'Dodaj użytkownika',
        }}/>}
      </DrawerNav.Navigator>
    
  )
}

export default MainScreen;