import { Box, Button, FormControl, HStack, Input, Stack, Text, TextArea, Center, Spinner } from 'native-base';
import React, {useState} from 'react'
import { useGlobalContext } from '../GlobalContext';
import { Alert } from 'react-native';


export default function AddUser({navigation}){

    const {globalStyles: {meetingDetailsScreen, textArea, fatText, input, label, labelText, button, buttonText}, registerUser, triggerLoadUserData} = useGlobalContext();

    const [isLoading, setLoading] = useState(false);

    const [userData, setUser] = useState({email: '', password: '', name: '', surname: ''});

    const userAdd = () => {
        setLoading(true);

        registerUser(userData.email, userData.password, userData.name, userData.surname)
            .then(()=>{
                Alert.alert(
                    "Użytkownik został dodany pomyślnie!",
                    "",
                    [
                        {
                        text: "OK",
                        }
                    ]
                    );  
            })
            .catch(exc=>{
                 Alert.alert(
                    "Nie udało dodać się użytkownika!",
                    "",
                    [
                        {
                        text: "OK",
                        }
                    ]
                    );  
            })
            .finally(()=>{
                setLoading(false);
                triggerLoadUserData();
                navigation.navigate('User');
            });

    }

    return (
        isLoading ? <Center flex={1} px="3">
      <Spinner accessibilityLabel="Loading..." size="lg"/>
    </Center>:
        <Box style={meetingDetailsScreen}>

            <HStack style={{marginBottom: 50}}>
                <Text style={fatText}>Add user</Text>
            </HStack>

            <FormControl>
                <Stack space={2}>

                    <FormControl.Label style={label}>
                        <Text style={labelText}>User Email</Text>
                    </FormControl.Label>

                    <Input style={input} onChangeText={val=>setUser({...userData, email: val})}/>

                    <FormControl.Label>
                        <Text style={labelText}>Password</Text>
                    </FormControl.Label>

                    <Input style={input} type="password" onChangeText={val=>setUser({...userData, password: val})}/>

                    <FormControl.Label>
                        <Text style={labelText}>Name</Text>
                    </FormControl.Label>

                    <Input style={input} onChangeText={val=>setUser({...userData, name: val})}/>

                    <FormControl.Label>
                        <Text style={labelText}>Username</Text>
                    </FormControl.Label>

                    <Input style={input} onChangeText={val=>setUser({...userData, surname: val})}/>
                </Stack>

                <Box>
                    <Button style={button} onPress={()=>userAdd()}>
                        <Text style={buttonText}>Add User</Text>
                    </Button>
                </Box>


            </FormControl>
        </Box>
    );
}