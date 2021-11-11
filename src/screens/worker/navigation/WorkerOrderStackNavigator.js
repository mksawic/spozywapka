import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkerOrderListScreen from "../orders/WorkerOrderListScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const WorkerOrderStackNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="WorkerOrderList"
        component={WorkerOrderListScreen}
        options={{ title: "Zamówienia", headerTitleAlign: "center" }}
      />
    </Navigator>
  );
};

export default WorkerOrderStackNavigator;
