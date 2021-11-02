import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreTopNavigator from "./StoreTopNavigator";
import StoreProducts from "../StoreProducts";

const { Navigator, Screen } = createNativeStackNavigator();

const StoreStackNavigator = () => {
  return (
    <Navigator>
      <Screen
        options={{ headerShown: false }}
        name="Stores"
        component={StoreTopNavigator}
      />
      <Screen
        name="Products"
        component={StoreProducts}
        options={({ route }) => ({
          title: route.params?.store?.name || "Produkty",
        })}
      />
    </Navigator>
  );
};

export default StoreStackNavigator;
