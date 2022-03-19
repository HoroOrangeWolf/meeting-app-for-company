import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Box, Button, FormControl, HStack, Input, Stack, Text } from 'native-base';
import React, {useState} from 'react'
import { useGlobalContext } from '../GlobalContext';
import { useAddMeetingContext } from './AddMeetingContext';

//https://github.com/react-native-datetimepicker/datetimepicker

export default function MettingsAlarm({navigation}) {
    const {globalStyles: {meetingDetailsScreen, fatText, input, label, labelText, button, buttonText}} = useGlobalContext();

    const [isTimerPicker, setIsDatePicker] = useState(false);

    const {meeting, setMeeting, onFinishClick} = useAddMeetingContext();

    const onTimePick = (event, date) => {
        setIsDatePicker(false);
        
        if(date === undefined)
            return;

        setMeeting({...meeting, alarm: date});
    };



    return (
        <Box style={meetingDetailsScreen}>

            <HStack style={{marginBottom: 50}}>
                <Text style={{...fatText}}>Set Notification</Text>
            </HStack>

            <FormControl>
                <Stack space={2}>

                    <FormControl.Label style={label}>
                        <Text style={labelText}>Pick Time</Text>
                    </FormControl.Label>

                    <Input  style={input} onPressIn={()=>setIsDatePicker(!isTimerPicker)} editable={!isTimerPicker} value={moment(meeting.alarm).format('HH:mm')} type="text"/>

                    {isTimerPicker && <RNDateTimePicker value={meeting.alarm} mode="time" onChange={onTimePick}/>}

                </Stack>

                <Box>
                    <Button style={button} onPress={onFinishClick}>
                        <Text style={buttonText}>Finish</Text>
                    </Button>
                </Box>


            </FormControl>
        </Box>
    );
}
