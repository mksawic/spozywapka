import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import Firebase from "../config/firebase";

const auth = Firebase.auth();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Button onPress={() => auth.signOut()}>Wyloguj</Button>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
