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

    const [isAlarmPicker, setAlarmPicker] = useState(false);


    const {singleMeeting, onMeetingMody, onBack} = route.params;

    const [meeting, setMeeting] = useState({...singleMeeting, alarmDate: new Date(singleMeeting.alarmDate), timeDate: new Date(singleMeeting.timeDate)});
    
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

    const onAlarmPick = (event, date) => {
        setAlarmPicker(false);
        
        if(date === undefined)
            return;

        setMeeting({...meeting, alarm: date});
        setModified(true);
    };

    

    return (

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{flex: 1}}>
                    <Center flex={1}>
                         <FormControl style={{width: "80%"}}>
                            <Stack space={2}>
                                <FormControl.Label style={label}>
                                    <Text style={labelText}>Name</Text>
                                </FormControl.Label>

                                <Input style={input} value={meeting.name} onChangeText={val=>{
                                    
                                    setMeeting({...meeting, name: val});
                                    setModified(true);
                                }}/>

                                <FormControl.Label>
                                    <Text style={labelText}>Description</Text>
                                </FormControl.Label>

                                <TextArea style={{...textArea, height: 100}} value = {meeting.description}  onChangeText={val=>{
                                    
                                    setMeeting({...meeting, description: val});
                                    setModified(true);
                                }}/>

                                <FormControl.Label style={label}>
                                    <Text style={labelText}>Pick Date</Text>
                                </FormControl.Label>

                                <Input  style={input} onPressIn={()=>setIsDatePicker(!isDatePicker)} editable={!isDatePicker} value={moment(meeting.timeDate).format('DD/MM/YYYY')} type="text"/>

                                {isDatePicker && <RNDateTimePicker value={meeting.timeDate} mode="date" onChange={onDatePick}/>}

                                <FormControl.Label style={label}>
                                    <Text style={labelText}>Pick Hour</Text>
                                </FormControl.Label>

                                <Input style={input} onPressIn={()=>setIsTimePicker(!iTimerPicker)} editable={!iTimerPicker} value={moment(meeting.timeDate).format('HH:mm')} type="text"/>

                                {iTimerPicker &&<RNDateTimePicker value={meeting.timeDate} mode="time" onChange={onTimePick}/>}

                                <FormControl.Label style={label}>
                                    <Text style={labelText}>Pick Time</Text>
                                </FormControl.Label>

                                <Input  style={input} onPressIn={()=>setAlarmPicker(!isAlarmPicker)} editable={!isAlarmPicker} value={moment(meeting.alarmDate).format('HH:mm')} type="text"/>

                                {isAlarmPicker && <RNDateTimePicker value={meeting.alarmDate} mode="time" onChange={onAlarmPick}/>}

                                <Button style={button} onPress={()=>navigation.navigate('QRCodeGenerator', {value: meeting.id} )}>
                                    <Text style={buttonText}>Generate QR Code</Text>
                                </Button>
                                {isModified && <Button style={button} onPress={()=>onMeetingMody(meeting)}>
                                    <Text style={buttonText}>Save</Text>
                                </Button>}
                                

                                <Button style={button} onPress={()=>onBack()}>
                                    <Text style={buttonText}>Back</Text>
                                </Button>
                                
                            </Stack>
                        </FormControl>
                    </Center>
                </ScrollView>         
    );

}