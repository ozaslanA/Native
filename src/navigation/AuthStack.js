// AuthStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../screen/LoginPage";
import SignUpPage from "../screen/SignUpPage";
import { FormPage } from "../screen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="Form" component={FormPage} />
    </Stack.Navigator>
  );
};

export default AuthStack;
