import React, { useContext, useState } from 'react';

import { StyleSheet } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc,deleteDoc, query, doc,getDocs, where, Query, getDoc, updateDoc } from "firebase/firestore";
import { Dimensions } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyDM5mFLrS_XBpeYOtfm8cUQVQXI4GdmMV0",
  authDomain: "meetingsmanagerapp.firebaseapp.com",
  projectId: "meetingsmanagerapp",
  storageBucket: "meetingsmanagerapp.appspot.com",
  messagingSenderId: "773403299384",
  appId: "1:773403299384:web:a85891506a2bd9c8dea0cd",
  measurementId: "G-WE7JWM3V6F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore();


const AppProvider = React.createContext();

export default function GlobalContext({children}) {
 
    const [user, setUser] = useState({});
    
    const [isLogged, setLogged] = useState(false);

    const [trigger, setTrigger] = useState(false);

    const [meetingBuff, setMeetingBuff] = useState([]);

    const [triggerUser, setTriggerUser] = useState(false);



    const triggerLoadData = () =>{
        setTrigger(!trigger);
    };

    const triggerLoadUserData = () => {
        setTriggerUser(!triggerUser);
    }

    const registerUser = async (email, password, name, surname) =>{
        const userc = await createUserWithEmailAndPassword(auth, email, password);

        await addDoc(collection(database, 'users'), {email, name, surname});

        return userc;
    };

    const loginUser = async (email, password) => {
        const userc = await signInWithEmailAndPassword(auth, email, password);
        const isAdmin = await getUserPerm(email);

        try{
            await getUsers();
        }catch(exc){
            console.log(exc);
        }
        
        setUser({...userc, isAdmin});
        setLogged(true);
    }

    const logOut = async () => {
        await signOut(auth);
        setUser({});
        setLogged(false);
    }

    const getUsers = async () => {
        const users = await getDocs(collection(database, 'users'));

        const ar = [];

        users.forEach(user=>{
            const {email, name, surname} = user.data();

            ar.push({id: user.id, email, name, surname});
        });

        return ar;
    }

    const updateUser = async (user) => {
        const {id, name, surname} = user;

        await updateDoc(doc(database, "users", id), {name, surname});
    }

    const getUserPerm = async (email) => {
        const qu = query(collection(database, 'admins'), where('email', '==', email));

        const snapshot = await getDocs(qu);
        const ar = [];

        snapshot.forEach(doc=>ar.push(doc.data()));

        return ar.length > 0;
    }

    const isAdmin = () => {
        return user.isAdmin;
    }

    const addMeetinng = async (meeting) => {
        const {name, description, calendarDate} = meeting;
        const timeDate = calendarDate.getTime();

        const docRef = await addDoc(collection(database, 'meeting'), {name, description, timeDate, userEmail: user.user.email });

        return docRef;
    }
    const getMeeting = async (id) => {
        const buff = await getDoc(doc(database, "meeting", id));
        return {id: buff.id, ...buff.data()};
    }
    const getMeetings = async () =>{

        const qu = query(collection(database, 'meeting'), where('userEmail', '==', user.user.email));

        const snapshot = await getDocs(qu);
        
        const ar = [];
        
        snapshot.forEach(doc=>ar.push({id: doc.id,...doc.data()}));
        ar.sort((first, sec) => first.timeDate - sec.timeDate);
        return ar;
    }

    const updateMeeting = async (meeting) => {
        const {id, name, description, timeDate} = meeting;

        await updateDoc(doc(database, "meeting", id), {...meeting, timeDate: timeDate.getTime()});
     } 

    const removeMeeting = async (docId) => {
       await deleteDoc(doc(database, "meeting", docId));
    }
    
    return (
        <AppProvider.Provider
            value={{
                globalStyles,
                registerUser,
                loginUser,
                addMeetinng,
                isAdmin,
                setUser,
                getMeetings,
                removeMeeting,
                getMeeting,
                meetingBuff, 
                setMeetingBuff,
                updateMeeting,
                isLogged,
                logOut,
                triggerLoadData,
                getUsers,
                triggerUser,
                triggerLoadUserData,
                updateUser,
                trigger}}
        >
            {
                children
            }
        </AppProvider.Provider>
    );
}

export const useGlobalContext = () =>{
    return useContext(AppProvider);
}

const globalStyles = StyleSheet.create({
    logRegScreen: {
        width: "70%",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        top: "-10%",
        flex: 1,
        overflow: "visible",
    },
    meetingDetailsScreen: {
        width: "70%",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        flex: 1,
        overflow: "visible",
    },

    input: {
        textAlign: "center",
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        fontSize: 22,
        height: 50
    },

    button: {  
        marginTop: 15,
        height: 50,
        borderRadius: 10,
    },

    fatText: {
        fontSize: 0.09*Dimensions.get('window').width,
        paddingTop: 40,
        fontWeight: "700",
        textAlign: "center",
    },

    titleText: {
        fontSize: 30,
        paddingTop: 10,
        lineHeight: 50,
        fontWeight: "700",
        textAlign: "center",
    },

    headerText: {
        fontSize: 24,
        marginTop: 10,
        padding: 20,
        marginLeft: 10,
        fontWeight: "700",
        textAlign: "left",
    },

    paragraphText: {
        fontSize: 16,
        marginLeft: 10,
        textAlign: "left",
    },

    buttonText: {
        fontSize: 22,
        color: "white",
        fontWeight: "700",
    },
    label: {
        
    },  
    labelText: {
        fontSize: 16,
    },
    textArea: {
        height: "40%",
        backgroundColor: "#EEEEEE",
        fontSize: 15,
    },
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    }

}
);
