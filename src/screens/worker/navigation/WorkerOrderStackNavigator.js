import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkerOrderListScreen from "../orders/WorkerOrderListScreen";
import WorkerOrderDetailsScreen from "../orders/WorkerOrderDetailsScreen";
import WorkerOrderTopNavigator from "./WorkerOrderTopNavigator";

const { Navigator, Screen } = createNativeStackNavigator();

const WorkerOrderStackNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="WorkerOrderList"
        component={WorkerOrderTopNavigator}
        options={{ title: "Zamówienia", headerTitleAlign: "center" }}
      />
      <Screen
        name="WorkerOrderDetails"
        component={WorkerOrderDetailsScreen}
        options={({ route }) => ({
          title: `ID: ${route.params?.order?.id}` || "Zamówienie",
          headerTitleAlign: "center",
        })}
      />
    </Navigator>
  );
};

export default WorkerOrderStackNavigator;
