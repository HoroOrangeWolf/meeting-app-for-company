import { Box, Button, Center, FormControl, HStack, Input, ScrollView, Stack, Text, TextArea } from 'native-base';
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../GlobalContext';
import moment from 'moment';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function MeetingEditor({navigation, route}) {

    const {triggerLoadData, globalStyles: {meetingDetailsScreen, textArea, fatText, input, label, labelText, button, buttonText}} = useGlobalContext();

    const [isModified, setModified] = useState(false);

    const [isDatePicker, setIsDatePicker] = useState(false);

    const [iTimerPicker, setIsTimePicker] = useState(false);


    const {singleMeeting, onMeetingMody, onBack, isEditBlocked} = route.params;

    const [meeting, setMeeting] = useState({...singleMeeting, timeDate: new Date(singleMeeting.timeDate)});
    
    const onDatePick = (event, date) => {
        setIsDatePicker(false);

        if(date === undefined)
            return;

        setMeeting({...meeting, timeDate: date});
        setModified(true);
    };

    const onTimePick = (event, date) => {

        setIsTimePicker(false);

        if(date === undefined)
            return;

        setMeeting({...meeting, timeDate: date});
        setModified(true);
    };


    return (

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{flex: 1}}>
                    <Center flex={1}>
                         <FormControl style={{width: "80%"}}>
                            <Stack space={2}>
                                <FormControl.Label style={label}>
                                    <Text style={labelText}>Nazwa</Text>
                                </FormControl.Label>

                                <Input style={input} 
                                value={meeting.name}
                                isDisabled={isEditBlocked} 
                                onChangeText={val=>{
                                    
                                    setMeeting({...meeting, name: val});
                                    setModified(true);
                                }}/>

                                <FormControl.Label>
                                    <Text style={labelText}>Opis</Text>
                                </FormControl.Label>

                                <TextArea 
                                style={{...textArea, height: 100}} 
                                value = {meeting.description}  
                                isDisabled={isEditBlocked} 
                                onChangeText={val=>{
                                    
                                    setMeeting({...meeting, description: val});
                                    setModified(true);
                                }}/>

                                <FormControl.Label style={label}>
                                    <Text style={labelText}>Wybierz date</Text>
                                </FormControl.Label>

                                <Input  
                                    style={input} 
                                    onPressIn={()=>setIsDatePicker(!isDatePicker)} 
                                    isDisabled={isEditBlocked} 
                                    editable={!isDatePicker} 
                                    value={moment(meeting.timeDate).format('DD/MM/YYYY')} 
                                    type="text"/>

                                {isDatePicker && <RNDateTimePicker value={meeting.timeDate} mode="date" onChange={onDatePick}/>}

                                <FormControl.Label style={label}>
                                    <Text style={labelText}>Wybierz godzine</Text>
                                </FormControl.Label>

                                <Input 
                                    style={input} 
                                    onPressIn={()=>setIsTimePicker(!iTimerPicker)} 
                                    editable={!iTimerPicker} 
                                    value={moment(meeting.timeDate).format('HH:mm')}
                                    isDisabled={isEditBlocked} 
                                    type="text"/>

                                {iTimerPicker &&<RNDateTimePicker value={meeting.timeDate} mode="time" onChange={onTimePick}/>}

                                <Button style={button} onPress={()=>navigation.navigate('QRCodeGenerator', {value: meeting.id} )}>
                                    <Text style={buttonText}>Wygeneruj kod QR</Text>
                                </Button>
                                {(isModified && !isEditBlocked) && <Button style={button} onPress={()=>onMeetingMody(meeting)}>
                                    <Text style={buttonText}>Zapisz</Text>
                                </Button>}
                                

                                <Button style={button} onPress={()=>onBack()}>
                                    <Text style={buttonText}>Powrót</Text>
                                </Button>
                                
                            </Stack>
                        </FormControl>
                    </Center>
                </ScrollView>         
    );

}