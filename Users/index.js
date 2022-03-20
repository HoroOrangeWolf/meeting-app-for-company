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
import EditUser from './EditUser';


export default function Users({navigation}){
    
    const {getUsers, triggerUser,globalStyles: {button}} = useGlobalContext();
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

    const onPressItem = (item) => {
        setItemModify(item);
        setModifying(true);
    };

    const goBack = () => {
        setModifying(false);
    };
    
    
    return (
        isLoading ? <Center flex={1} px="3">
      <Spinner accessibilityLabel="Loading..." size="lg"/>
    </Center>: isModifying ? <EditUser data={itemModify} onClickBack={()=>goBack()}/> :
        <UserList data={users} onPress={onPressItem}/>
    );
}