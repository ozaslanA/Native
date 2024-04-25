import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";

const RootNavigation = () => {
  const isAuth = false;

  return (
    <NavigationContainer screenOptions={{ headerShown: false }}>
      {!isAuth ? <AuthStack /> : <UserStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
