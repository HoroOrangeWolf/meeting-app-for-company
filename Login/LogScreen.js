import React, {useState} from 'react'
import {
  Text,
  Box,
  Button,
  Input,
  FormControl,
  Spinner,
  Stack,
  Center,
  Icon,
} from 'native-base';

import {Alert} from 'react-native';

import { useGlobalContext } from '../GlobalContext';
import { useLoginComponentContext } from './LoginComponentProvider';
import { MaterialIcons } from "@expo/vector-icons";

export default function LogScreen({navigation}) {

    const {globalStyles: {label, input, labelText, button, logRegScreen, buttonText}, loginUser} = useGlobalContext();

    const {logInData, setLogInData, handleLogin} = useLoginComponentContext();
    
    const [isLogging, setLogging] = useState(false);

    return (
        isLogging ?  <Center flex={1} px="3">
            <Spinner accessibilityLabel="Loging..." size="lg"/>
        </Center>:<Box style={logRegScreen}>
            <FormControl>
                <Stack space={2}>
                    <Center>
                        <Text style={{fontWeight: "700", color: "rgba(6, 182, 212, 87)", fontSize: 50, padding: 30, fontStyle: 'italic'}}>
                            MeetApp
                        </Text>
                    </Center>
                    <FormControl.Label style={label}>
                        <Text style={labelText}>Email</Text>
                    </FormControl.Label>
                    
                        <Input style={input} onChangeText={(value)=>setLogInData({...logInData, login: value})} type="text" InputLeftElement={<Icon style={{color: "gray"}} as={<MaterialIcons name="email"/>}/>}/>
                    
                    <FormControl.Label style={label}>
                        <Text style={labelText}>Password</Text>
                    </FormControl.Label>

                    <Input style={input} onChangeText={(value)=>setLogInData({...logInData, password: value})} type="password" InputLeftElement={<Icon style={{color: "gray"}} as={<MaterialIcons name="lock"/>}/>}/>
                    
                    <Box style={{marginTop: 25}}>
                    
                        <Button style={button} type="submit" onPress={()=>
                            {
                                setLogging(true);
                                handleLogin(logInData.login, logInData.password)
                                    .catch(exc=>{
                                        if(exc.message === 'User is blocked!'){
                                            Alert.alert(
                                                "Error!",
                                                "Account is blocked!",
                                                [
                                                { text: "OK" }]);
                                        }else{
                                            Alert.alert(
                                                "Error!",
                                                "Invalid email or password!",
                                                [
                                                { text: "OK" }]);
                                        }

                                        setLogging(false);
        
                                    });
                            }
                            }>
                            <Text style={buttonText}>
                                 Login
                            </Text>
                         </Button>
                    </Box>

                </Stack>
            </FormControl>
        </Box>
        
        
    );
}

