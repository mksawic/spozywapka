import React from "react";
import { View } from "react-native";
import {
  Input,
  Button,
  Text,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import Logo from "../../assets/img/Logo";
import Firebase from "../../config/firebase";
import { getAuthMessage } from "../../config/codes";
import { useLoaderContext } from "../../contexts/LoaderContext";

const auth = Firebase.auth();

const LoginScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const { setLoading } = useLoaderContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const handleLogin = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => setError(getAuthMessage(err.code)))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Layout style={styles.container}>
        <Logo />
        <View style={styles.inputWrapper}>
          <Input
            style={styles.marginBottom}
            size="large"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoComplete="email"
            keyboardType="email-address"
            status={error ? "warning" : undefined}
          />
          <Input
            size="large"
            placeholder="Hasło"
            value={password}
            onChangeText={setPassword}
            status={error ? "warning" : undefined}
            secureTextEntry
          />
        </View>
        <Text status="warning">{error}</Text>
        <View style={styles.buttonWrapper}>
          <Button
            size="large"
            style={styles.marginBottom}
            onPress={handleLogin}
          >
            Zaloguj się
          </Button>
          <Button
            size="large"
            style={styles.button}
            appearance="outline"
            onPress={() => navigation.navigate("Register")}
          >
            Rejestracja
          </Button>
        </View>
      </Layout>
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "color-primary-600",
  },
  inputWrapper: {
    width: "100%",
  },
  buttonWrapper: {
    width: "100%",
    marginBottom: 36,
  },
  marginBottom: {
    marginBottom: 8,
  },
});

export default LoginScreen;
