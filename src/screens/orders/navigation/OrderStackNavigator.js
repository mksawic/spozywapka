import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderListScreen from "../OrderListScreen";
import OrderDetailsScreen from "../OrderDetailsScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="OrderList"
        component={OrderListScreen}
        options={{ title: "Zamówienia", headerTitleAlign: "center" }}
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
