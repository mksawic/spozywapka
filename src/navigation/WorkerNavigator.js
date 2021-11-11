import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import StoreStackNavigator from "../screens/stores/navigation/StoreStackNavigator";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { CartIcon, FileIcon, PersonIcon } from "../assets/img/Icons";
import OrderStackNavigator from "../screens/orders/navigation/OrderStackNavigator";
import WorkerOrderStackNavigator from "../screens/worker/navigation/WorkerOrderStackNavigator";
import ProductStackNavigator from "../screens/worker/navigation/ProductStackNavigator";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={FileIcon} />
    <BottomNavigationTab icon={CartIcon} />
    <BottomNavigationTab icon={PersonIcon} />
  </BottomNavigation>
);

const WorkerNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Screen
        name="ManageOrders"
        component={WorkerOrderStackNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name="ManageProducts"
        component={ProductStackNavigator}
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

export default WorkerNavigator;
