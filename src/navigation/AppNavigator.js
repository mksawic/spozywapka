import React, { useState } from "react";
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
      {isAuthenticated ? <BottomTabNavigator /> : <LoginNavigator />}
    </SafeAreaView>
  );
};

export default AppNavigator;
