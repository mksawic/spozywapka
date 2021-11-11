import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginNavigator from "./LoginNavigator";
import Firebase from "../firebase";
import AuthNavigator from "./AuthNavigator";
import { getUser } from "../firebase/UserService";
import { useDispatch } from "react-redux";
import { getWorkerData } from "../store/workerSlice";

const auth = Firebase.auth();

const AppNavigator = () => {
  const distpach = useDispatch();
  const [userType, setUserType] = useState(null);
  auth.onAuthStateChanged((user) => {
    if (user?.uid) {
      getUser(user.uid).then((user) => {
        if (user?.store) {
          distpach(getWorkerData(user.store));
          setUserType("worker");
        } else setUserType("user");
      });
    } else setUserType(null);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {userType ? <AuthNavigator userType={userType} /> : <LoginNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
