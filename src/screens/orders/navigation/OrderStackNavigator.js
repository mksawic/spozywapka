import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderListScreen from "../OrderListScreen";
import OrderDetailsScreen from "../OrderDetailsScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Screen
        name="OrderList"
        component={OrderListScreen}
        options={{ title: "Zamówienia" }}
      />
      <Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: "Szczegóły zamówienia" }}
      />
    </Navigator>
  );
};

export default OrderStackNavigator;
