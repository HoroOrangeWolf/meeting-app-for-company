
import Login from '../Login'
import { useGlobalContext } from "../GlobalContext";

import React,{ useState } from 'react';
import { Alert } from 'react-native';
import MainScreen from '../MainScreen';


export default Main = () =>{

    const {registerUser, loginUser, isLogged} = useGlobalContext();

    const handleLogin = async (email, pass) => {
        try{
            
            await loginUser(email, pass);

        }catch(exc){
            throw exc;
        }    
    }
    
    return (

        isLogged ? <MainScreen/> : <Login handleLogin={handleLogin}/>

    );

}