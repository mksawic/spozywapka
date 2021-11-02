import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Text,
} from "@ui-kitten/components";
import StoreStackNavigator from "../screens/stores/navigation/StoreStackNavigator";
import OrdersScreen from "../screens/orders/OrdersScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { CartIcon, FileIcon, PersonIcon } from "../assets/img/Icons";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={CartIcon} />
    <BottomNavigationTab icon={FileIcon} />
    <BottomNavigationTab icon={PersonIcon} />
  </BottomNavigation>
);

const UserNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Screen
        options={{ headerShown: false }}
        name="Sklepy"
        component={StoreStackNavigator}
      />
      <Screen name="Zamówienia" component={OrdersScreen} />
      <Screen name="Konto" component={SettingsScreen} />
    </Navigator>
  );
};

export default UserNavigator;
