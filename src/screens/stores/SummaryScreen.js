import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Layout,
  List,
  useStyleSheet,
  StyleService,
  Button,
  Text,
  Modal,
  Card,
} from "@ui-kitten/components";
import SummaryListItem from "./components/SummaryListItem";
import SummaryListFooter from "./components/SummaryListFooter";
import { useLoaderContext } from "../../contexts/LoaderContext";
import { addNewOrder } from "../../firebase/OrderService";
import { getFirestoreMessage } from "../../firebase/codes";
import { setInitial } from "../../store/cartSlice";
import { getOrdersAction } from "../../store/orderSlice";

const SummaryScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyle);
  const { products, total, store } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { setLoading } = useLoaderContext();
  const handleCheckout = () => {
    setLoading(true);
    addNewOrder(Object.values(products), store)
      .then(() => {
        dispatch(getOrdersAction());
        setShowModal(true);
      })
      .catch((err) => setError(getFirestoreMessage(err.message)))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Layout style={styles.container} level="2">
        <List
          data={Object.values(products).filter((product) => product.amount > 0)}
          renderItem={(props) => <SummaryListItem {...props} />}
          ListFooterComponent={() => <SummaryListFooter />}
        />
        {error && (
          <Text style={styles.error} status="danger">
            {error}
          </Text>
        )}
        <Button
          onPress={handleCheckout}
          style={styles.checkoutButton}
          size="giant"
          disabled={total === 0}
        >
          Zamów
        </Button>
      </Layout>
      <Modal visible={showModal} backdropStyle={styles.backdrop}>
        <Card style={styles.card}>
          <Text style={styles.marginBottom}>
            Udało Ci się pomyślnie złożyć zamówienie!
          </Text>
          <Button
            onPress={() => {
              setShowModal(false);
              dispatch(setInitial());
              navigation.navigate("StoreNavigator");
            }}
          >
            OK
          </Button>
        </Card>
      </Modal>
    </>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
  error: {
    padding: 8,
    alignSelf: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
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

export default SummaryScreen;
