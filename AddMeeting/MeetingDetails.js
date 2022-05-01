import { Box, Button, FormControl, HStack, Input, Stack, Text, TextArea } from 'native-base';
import React, {useState} from 'react'
import { useGlobalContext } from '../GlobalContext';
import { useAddMeetingContext } from './AddMeetingContext';

export default function MeettingDetails({navigation}) {
    
    const {globalStyles: {meetingDetailsScreen, textArea, fatText, input, label, labelText, button, buttonText}} = useGlobalContext();
    const {meeting, setMeeting} = useAddMeetingContext();

    return (
        <Box style={meetingDetailsScreen}>

            <HStack style={{marginBottom: 50}}>
                <Text style={fatText}>Dodaj Spotkanie</Text>
            </HStack>

            <FormControl>
                <Stack space={2}>

                    <FormControl.Label style={label}>
                        <Text style={labelText}>Spotkanie</Text>
                    </FormControl.Label>

                    <Input style={input} onChangeText={val=>setMeeting({...meeting, name: val})}/>

                    <FormControl.Label>
                        <Text style={labelText}>Opis</Text>
                    </FormControl.Label>

                    <TextArea style={textArea} onChangeText={val=>setMeeting({...meeting, description: val})}/>
                </Stack>

                <Box>
                    <Button style={button} onPress={()=>navigation.navigate('MeetingSetup')}>
                        <Text style={buttonText}>Następny</Text>
                    </Button>
                </Box>


            </FormControl>
        </Box>
    );

}