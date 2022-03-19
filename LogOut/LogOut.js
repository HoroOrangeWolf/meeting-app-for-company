import React from 'react';
import { Text } from 'native-base';
import { Spinner, Center, Button } from 'native-base';
import { useGlobalContext } from '../GlobalContext';
import { useState } from 'react';

function LogOut() {

  const [isLoading, setLoading] = useState(false);

  const {globalStyles: {button}, logOut} = useGlobalContext()

  const onLogOut = () =>{
    setLoading(true);
    logOut()
      .catch(()=>{setLoading(false)});
  }

    return (
      <Center flex={1} px="3">
        {isLoading ? <Spinner accessibilityLabel="Loading posts" /> :<Button onPress={onLogOut} style={button} >Wyloguj</Button>}
      </Center>
    );
}

export default LogOut;