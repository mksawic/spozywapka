import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar, Tab } from "@ui-kitten/components";
import WorkerOrderList from "../orders/components/WorkerOrderList";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="Do realizacji" />
    <Tab title="Pozostałe" />
  </TabBar>
);

const WorkerOrderTopNavigator = () => (
  <Navigator tabBar={(props) => <TopTabBar {...props} />}>
    <Screen name="OrdersToDo">
      {(props) => <WorkerOrderList statusToDisplay={[1]} {...props} />}
    </Screen>
    <Screen name="OrdersOther">
      {(props) => <WorkerOrderList statusToDisplay={[2, 3, 4, 5]} {...props} />}
    </Screen>
  </Navigator>
);

export default WorkerOrderTopNavigator;
