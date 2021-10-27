import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginNavigator from "./LoginNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import Firebase from "../firebase";

const auth = Firebase.auth();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  auth.onAuthStateChanged((user) => {
    setIsAuthenticated(!!user);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {isAuthenticated ? <BottomTabNavigator /> : <LoginNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
