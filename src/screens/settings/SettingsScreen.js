import React from "react";
import {
  Layout,
  Button,
  Text,
  useStyleSheet,
  StyleService,
} from "@ui-kitten/components";
import Firebase from "../../firebase";
import { View } from "react-native";
import useDateFormat from "../../hooks/useDateFormat";

const auth = Firebase.auth();

const SettingsScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const [dateFormatter] = useDateFormat();
  const { lastSignInTime, creationTime } = auth.currentUser.metadata;
  return (
    <Layout style={styles.container}>
      <View>
        <Text appearance="hint">Email:</Text>
        <Text style={styles.marginBottom} category="h4">
          {auth.currentUser.email}
        </Text>
        <Text appearance="hint">Zweryfikowano:</Text>
        <Text style={styles.marginBottom} category="h4">
          {auth.currentUser.emailVerified ? "tak" : "nie"}
        </Text>
        <Text appearance="hint">Data rejestracji:</Text>
        <Text style={styles.marginBottom} category="h4">
          {dateFormatter(new Date(creationTime))}
        </Text>
        <Text appearance="hint">Ostatnie logowanie:</Text>
        <Text style={styles.marginBottom} category="h4">
          {dateFormatter(new Date(lastSignInTime))}
        </Text>
      </View>

      <Button size="giant" onPress={() => auth.signOut()}>
        Wyloguj
      </Button>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  marginBottom: {
    borderColor: "color-primary-transparent-100",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default SettingsScreen;
