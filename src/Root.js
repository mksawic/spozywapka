import React from "react";
import { StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { default as theme } from "./themes/theme.json";
import { default as mapping } from "./themes/mapping.json";
import useCachedResources from "./hooks/useCachedResources";

const Root = () => {
  const isLoadingComplete = useCachedResources();
  return isLoadingComplete ? (
    <ApplicationProvider
      {...eva}
      theme={{ ...eva.light, ...theme }}
      customMapping={mapping}
    >
      <Layout style={styles.container}>
        <Text category="h1">Hello world!</Text>
      </Layout>
    </ApplicationProvider>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Root;
