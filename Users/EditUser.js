import { Box, Button, FormControl, HStack, Input, Stack, Text, TextArea, Center, Spinner } from 'native-base';
import React, {useState} from 'react'
import { useGlobalContext } from '../GlobalContext';
import { Alert } from 'react-native';


export default function EditUser({data, onClickBack}){

    const {globalStyles: {meetingDetailsScreen, textArea, fatText, input, label, labelText, button, buttonText}, triggerLoadUserData, updateUser} = useGlobalContext();

    const [isLoading, setLoading] = useState(false);

    const [userData, setUser] = useState({...data});

    const editUser = () => {
        setLoading(true);

        updateUser(userData)
            .then(()=>{
                Alert.alert(
                    "Użytkownik został zmodyfikowany pomyślnie!",
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
                    "Nie udało się zmodyfikować użytkownika!",
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
                onClickBack();
            });

    }

    const goBack = () => {
        onClickBack();
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

                    <FormControl.Label>
                        <Text style={labelText}>Name</Text>
                    </FormControl.Label>

                    <Input style={input} onChangeText={val=>setUser({...userData, name: val})} value={userData.name}/>

                    <FormControl.Label>
                        <Text style={labelText}>Username</Text>
                    </FormControl.Label>

                    <Input style={input} onChangeText={val=>setUser({...userData, surname: val})} value={userData.name}/>
                </Stack>

                <Box>
                    <Button style={button} onPress={()=>editUser()}>
                        <Text style={buttonText}>Edit User</Text>
                    </Button>
                </Box>
                
                <Box>
                    <Button style={button} onPress={()=>goBack()}>
                        <Text style={buttonText}>Back</Text>
                    </Button>
                </Box>


            </FormControl>
        </Box>
    );
}