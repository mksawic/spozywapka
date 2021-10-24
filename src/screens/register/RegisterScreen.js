import React, { useState } from "react";
import { View } from "react-native";
import {
  Input,
  Button,
  Layout,
  Text,
  Modal,
  Card,
  TopNavigation,
  TopNavigationAction,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import Logo from "../../assets/img/Logo";
import { BackIcon } from "../../assets/img/Icons";
import Firebase from "../../config/firebase";
import { getAuthMessage } from "../../config/codes";
import { useLoaderContext } from "../../contexts/LoaderContext";

const auth = Firebase.auth();

const RegisterScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const { setLoading } = useLoaderContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleRegister = () => {
    if (password === retypePassword) {
      setLoading(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => setShowModal(true))
        .catch((err) => setError(getAuthMessage(err.code)))
        .finally(() => setLoading(false));
    } else setError("Hasła nie są takie same");
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
  return (
    <>
      <TopNavigation accessoryLeft={BackAction} style={styles.topNavigation} />
      <Layout style={styles.container}>
        <Logo />
        <View style={styles.inputWrapper}>
          <Input
            style={styles.marginBottom}
            size="large"
            placeholder="Email"
            autoComplete="email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            status={error ? "warning" : undefined}
          />
          <Input
            style={styles.marginBottom}
            size="large"
            placeholder="Hasło"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            status={error ? "warning" : undefined}
          />
          <Input
            size="large"
            placeholder="Powtórz hasło"
            value={retypePassword}
            onChangeText={setRetypePassword}
            secureTextEntry
            status={error ? "warning" : undefined}
          />
        </View>
        <Text status="warning">{error}</Text>
        <View style={styles.buttonWrapper}>
          <Button size="large" appearance="outline" onPress={handleRegister}>
            Zarejestruj się
          </Button>
        </View>
      </Layout>
      <Modal visible={showModal} backdropStyle={styles.backdrop}>
        <Card style={styles.card}>
          <Text style={styles.marginBottom}>
            Proces rejestracji przebiegł pomyślnie! Kliknij w link aktywacyjny
            wysłany na podany adres aby móc się zalogować.
          </Text>
          <Button
            onPress={() => {
              setShowModal(false);
              navigation.goBack();
            }}
          >
            OK
          </Button>
        </Card>
      </Modal>
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "color-primary-600",
  },
  topNavigation: {
    backgroundColor: "color-primary-600",
  },
  inputWrapper: {
    width: "100%",
  },
  buttonWrapper: {
    width: "100%",
    marginBottom: 32,
  },
  marginBottom: {
    marginBottom: 12,
  },
  card: {
    paddingVertical: 20,
    margin: 16,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default RegisterScreen;
