import React from "react";
import Root from "./src/Root";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

const App = () => <Root />;
export default App;
