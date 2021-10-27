import React from "react";
import { Layout, Button } from "@ui-kitten/components";
import Firebase from "../../firebase";

const auth = Firebase.auth();

const SettingsScreen = () => {
  return (
    <Layout>
      <Button onPress={() => auth.signOut()}>Wyloguj</Button>
    </Layout>
  );
};

export default SettingsScreen;
