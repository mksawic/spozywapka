import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login/LoginScreen";
import RegisterScreen from "../screens/register/RegisterScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Register" component={RegisterScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigator;
