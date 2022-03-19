import React, { useState } from 'react'
import { useGlobalContext } from '../GlobalContext';
import { Box, Button, Center, Text } from 'native-base';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeGenerator({navigation, route}) {

    const {globalStyles: {meetingDetailsScreen, fatText, button, buttonText}} = useGlobalContext();

    const { value } = route.params;

    return (
        <Box style={meetingDetailsScreen}>
            <Center flex={1} px="3">
                <Text style={{...fatText, fontSize: 20, marginBottom: 40}}>Kod QR Twojego spotkania</Text>
                <QRCode value={value} size={200}/>
                <Button style={{...button, width: "100%", marginTop: 40}} onPress={()=>navigation.goBack()}>
                    <Text style={buttonText}>
                            Powrót
                    </Text>
                </Button>
            </Center>
        </Box>
    );

}