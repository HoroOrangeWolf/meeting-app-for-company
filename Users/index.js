import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import { useGlobalContext } from '../GlobalContext';
import {
    Text,
    Button,
    Icon,
    Center,
    Spinner
} from 'native-base';

import { MaterialIcons } from "@expo/vector-icons";
import UserList from './UserList'
import { Alert } from "react-native";

export default function Users({navigation}){
    
    const {getUsers, triggerUser,globalStyles: {button}, blockUser, triggerLoadUserData} = useGlobalContext();
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isModifying, setModifying] = useState(false);
    const [itemModify, setItemModify] = useState({});
    

    useEffect(()=>{
            navigation.setOptions({
                headerRight: () => {
                    return (
                        <Button style={{backgroundColor: 'rgba(0,0,0, 0)'}} onPress={()=>navigation.navigate('addUsers')}>
                            <Icon style={{color: "gray"}} as={<MaterialIcons name="add"/>}/>
                        </Button>
                    );
                }
        });
    }, []);

    useEffect(()=>{
        setLoading(true);
        getUsers()
            .then(val=>{
                setUsers(val);
            })
            .finally(()=>{
                setLoading(false);
            })
            
    },[triggerUser]);

    const block = (item) => {
        setLoading(true);
        blockUser(item, !item.isBlock)
            .then(()=>{
                triggerLoadUserData();
            })
            .catch(exc=>{
                setLoading(false);
                 Alert.alert(
                    "Error!",
                    "",
                    [
                    { text: "Ok" }
                    ]);
            });
    }

    const onLongPress = (item)=>{
        Alert.alert(
          `Czy chcesz ${item.isBlock ? 'odblokować' : 'zablokować'} tego użytkownika?`,
          `Email: ${item.email}`,
          [
          { text: "Tak", onPress: ()=>block(item) },
          {text: "Nie"}
        ]);
    }

    const goBack = () => {
        setModifying(false);
    };
    
    
    return (
        isLoading ? <Center flex={1} px="3">
      <Spinner accessibilityLabel="Loading..." size="lg"/>
    </Center>: <UserList data={users} onLongPress={onLongPress}/>
    );
}