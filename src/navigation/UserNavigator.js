import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import StoreStackNavigator from "../screens/stores/navigation/StoreStackNavigator";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { CartIcon, FileIcon, PersonIcon } from "../assets/img/Icons";
import OrderStackNavigator from "../screens/orders/navigation/OrderStackNavigator";

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
        unmountOnBlur: true,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Screen
        name="Stores"
        component={StoreStackNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Konto" }}
      />
    </Navigator>
  );
};

export default UserNavigator;
