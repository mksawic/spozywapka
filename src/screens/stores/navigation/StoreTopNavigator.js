import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar, Tab } from "@ui-kitten/components";
import StoreListScreen from "../StoreListScreen";
import StoreMapScreen from "../StoreMapScreen";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="Lista" />
    <Tab title="Mapa" />
  </TabBar>
);

const StoreTopNavigator = () => (
  <Navigator
    tabBar={(props) => <TopTabBar {...props} />}
    screenOptions={{
      tabBarLabelStyle: { fontSize: 16 },
      tabBarStyle: { backgroundColor: "powderblue" },
    }}
  >
    <Screen name="StoreList" component={StoreListScreen} />
    <Screen name="StoreMap" component={StoreMapScreen} />
  </Navigator>
);

export default StoreTopNavigator;
