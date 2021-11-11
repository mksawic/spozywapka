import React from "react";
import UserNavigator from "./UserNavigator";
import WorkerNavigator from "./WorkerNavigator";

const AuthNavigator = ({ userType }) => {
  switch (userType) {
    case "user":
      return <UserNavigator />;
    case "worker":
      return <WorkerNavigator />;
    default:
      return null;
  }
};

export default AuthNavigator;
