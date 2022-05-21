import React, { useContext, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogScreen from "./LogScreen";
import LoginComponentProvider from "./LoginComponentProvider";

const Stack = createNativeStackNavigator();

import { useGlobalContext } from "../GlobalContext";

export default function Login({ handleLogin }) {
  const [logInData, setLogInData] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <LoginComponentProvider value={{ logInData, setLogInData, handleLogin }}>
      <LogScreen />
    </LoginComponentProvider>
  );
}
