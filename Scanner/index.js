import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useGlobalContext } from '../GlobalContext';
import { Box, Spinner, Center} from "native-base"

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');
  const {getMeeting, addMeetinng, triggerLoadData} = useGlobalContext();
  const [isLoading, setLoading] = useState(false);
  

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setData(data);
    Alert.alert(
      "Czy chcesz dolaczyc do spotkania?",
      "",
      [
        {
          text: "Tak",
          onPress: () => {
            setLoading(true);
            getMeeting(data)
              .then(value => {
                const {name, userEmail, description, alarmDate, timeDate} = value;
                addMeetinng({name, userEmail, description, alarm: new Date(alarmDate),calendarDate: new Date(timeDate)})
                  .then(()=>{
                    setLoading(false);
                    triggerLoadData();
                    Alert.alert(
                      "Udalo sie dolaczyc do spotkania!",
                      "",
                      [
                        {
                          text: "OK",
                        }
                      ]
                    )
                  })
                  .catch(exc => {
                    setLoading(false);
                    Alert.alert(
                      "Nie udalo sie dolaczyc do spotkania!",
                      "Sprobuj ponownie!",
                      [
                        {
                          text: "OK",
                        }
                      ]
                    )
                  })
              })
              .catch(exc => {
                setLoading(false);
                Alert.alert(
                  "Nie udalo sie dolaczyc do spotkania!",
                  "Sprobuj ponownie!",
                  [
                    {
                      text: "OK",
                    }
                  ]
                )
              });
          }
        },
        {
          text: "Nie"
        }
      ]
    );
    setScanned(true);
  };

  if (hasPermission === false) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


return (
    isLoading ? <Center flex={1} px="3">
      <Spinner accessibilityLabel="Loading..." size="lg"/>
    </Center>:<View style={styles.container}>
      <View style={styles.barcodebox}>
        {(hasPermission && !scanned) && <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={{ height: 400, width: 400 }} />}
        
      </View>
      <Text style={styles.maintext}>{data}</Text>

      {scanned && <Button title={'Scan again?'} onPress={() => {
        setData('');
        setScanned(false);
        }} color='tomato' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});