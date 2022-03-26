import React, {useState, useEffect} from "react"

import EditMeeting from "../EditMeeting";

import { Box,FlatList,Heading,Avatar,HStack,VStack,Text,Spacer,Center,NativeBaseProvider, Spinner} from "native-base"
import { Alert,SafeAreaView, ScrollView } from "react-native";
import { useGlobalContext } from "../GlobalContext";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import List from "./List";
import { isAdmin } from "@firebase/util";


export default function HomeTab({navigation})  {


  const [meetings, setMeetings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isModifying, setModifying] = useState(false);
  const [itemToModify, setItemModify] = useState({});
  

  const {getMeetings, removeMeeting, trigger, triggerLoadData,leaveMeeting,updateMeeting, setMeetingBuff, isAdmin, isMeetingOwner} = useGlobalContext();

  useEffect(() => {
    setLoading(true);
    getMeetings()
      .then(value => {
        setMeetings(value);
        setMeetingBuff(value);
      })
      .catch(exc=>{
        Alert.alert(
          "Error!",
          "Nie mozna pobrać spotkań.",
          [
          { text: "OK" }]);
      }).finally(()=>{
        setLoading(false);
      });
  }, [trigger]);

  const deleteMeeting = (itemId) =>{
    setLoading(true);
    removeMeeting(itemId)
      .then(()=>{
        triggerLoadData();
      })
      .catch(()=>{
        Alert.alert(
          "Error!",
          "Nie można usunąć spotkania.",
          [
            { text: "OK" }
          ]);
      }).finally(()=>{
        setLoading(true);
      });
  }

  const leaveMeetingInside = (itemId) => {
    setLoading(true);
    leaveMeeting(itemId)
      .then(()=>{
        triggerLoadData();
      })
      .catch(exc=>{
        Alert.alert(
          "Error!",
          "Opuścić spotkania.",
          [
          { text: "OK" }]);
      })
      .finally(()=>{
        setLoading(true);
      });
  }
  

  const longPress = (item) => {
    
    if(isMeetingOwner(item.id) && isAdmin()){
      Alert.alert(
        "Usuwanie Spotkania",
        `Czy chcesz usunąć: ${item.name}?`,
        [
        { text: "Tak", onPress: ()=> deleteMeeting(item.id) }, {text: "Nie"}]);
    }else{
      Alert.alert(
        "Opuszczanie spotkania",
        `Czy chcesz opuścić spotkanie: ${item.name}?`,
        [
        { text: "Tak", onPress: ()=> leaveMeetingInside(item.id) }, {text: "Nie"}]);
    }
  };

  const onPressItem = (item) => {
    setItemModify(item);
    setModifying(true);
  };

  const onItemModification = async (modifiedItem) => {
    setModifying(false);
    setLoading(true);

    updateMeeting(modifiedItem)
        .then(()=>{
          triggerLoadData();
        })
        .catch((exc)=>{
          console.log(exc);
            Alert.alert(
              "Błąd",
              `Wystąpił błąd podczas modyfikowania spotkania`,
              [
              { text: "OK"}]);
        })
        .finally(()=>{
          setLoading(false);
        });
  };

  const onBack = () => {
    setModifying(false);
  };


  return (

    isLoading ? <Center flex={1} px="3">
      <Spinner accessibilityLabel="Loading..." size="lg"/>
    </Center>: isModifying ? <EditMeeting onMeetingMody={onItemModification} singleMeeting={itemToModify} onBack={onBack} isEditBlocked={!isAdmin()}/>: <Box
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      {meetings.length > 0 ? <List data={meetings} longPress={longPress} onPress={onPressItem} /> : <Center>
          <Text style={{padding: 10, fontSize: 20, fontWeight: "bold"}}>
            Brak dodanych spotkań!
          </Text>
        </Center>}
    </Box>

    
  )
}
