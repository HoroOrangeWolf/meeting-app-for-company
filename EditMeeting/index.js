import React, { useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useGlobalContext } from '../GlobalContext';
import MeetingEditor from './MeetingEditor';
import { Alert } from 'react-native';
import QRCodeGenerator from './QRCodeGenerator';

const Stack = createNativeStackNavigator();

export default function EditMeeting({onMeetingMody, singleMeeting, onBack}) {

    const {addMeetinng, triggerLoadData} = useGlobalContext();

    const [isModified, setModified] = useState(false);

    return (
        
            <Stack.Navigator initialRouteName="MeetingEditor" >
                <Stack.Screen name="MeetingEditor" component={MeetingEditor} options={{headerShown: false}} initialParams={{singleMeeting, onMeetingMody, onBack}}/>
                <Stack.Screen name="QRCodeGenerator" component={QRCodeGenerator} options={{headerShown: false}}/>
            </Stack.Navigator>
      
    );
}