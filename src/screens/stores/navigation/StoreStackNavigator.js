import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreTopNavigator from "./StoreTopNavigator";
import ProductsScreen from "../ProductsScreen";
import SummaryScreen from "../SummaryScreen";

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
        component={ProductsScreen}
        options={({ route }) => ({
          title: route.params?.store?.name || "Produkty",
        })}
      />
      <Screen
        name="Summary"
        options={{ title: "Podsumowanie" }}
        component={SummaryScreen}
      />
    </Navigator>
  );
};

export default StoreStackNavigator;
