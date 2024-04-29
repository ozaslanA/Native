import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import { useSelector } from "react-redux";
import app from "../../fireBaseConfig";
const RootNavigation = () => {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <NavigationContainer screenOptions={{ headerShown: false }}>
      {!isAuth ? <AuthStack /> : <UserStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
