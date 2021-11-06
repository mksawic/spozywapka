import React, { useState } from "react";
import {
  Layout,
  List,
  Modal,
  Card,
  Button,
  Text,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderContext } from "../../contexts/LoaderContext";
import OrderDetailsItem from "./components/OrderDetailsItem";
import OrderDetailsFooter from "./components/OrderDetailsFooter";
import { cancelOrder } from "../../firebase/OrderService";
import { cancelOrder as cancelOrderAction } from "../../store/orderSlice";

const OrderDetailsScreen = ({ route }) => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { id } = route?.params?.order;
  const order = orders.find((order) => order.id === id);
  const [showModal, setShowModal] = useState(false);
  const [canCancel, setCanCancel] = useState(order.status < 4);
  const { setLoading } = useLoaderContext();
  const handleCancel = () => {
    setLoading(true);
    setCanCancel(false);
    cancelOrder(order)
      .then(() => {
        dispatch(cancelOrderAction(order));
        setCanCancel(false);
      })
      .finally(() => {
        setLoading(false);
        setShowModal(true);
      });
  };
  return (
    <>
      <Layout style={styles.container} level="2">
        <List
          data={order.products}
          renderItem={(props) => <OrderDetailsItem {...props} />}
          ListFooterComponent={() => <OrderDetailsFooter order={order} />}
        />
        {canCancel && (
          <Button
            onPress={handleCancel}
            style={styles.cancelButton}
            size="giant"
          >
            Anuluj
          </Button>
        )}
      </Layout>
      <Modal visible={showModal} backdropStyle={styles.backdrop}>
        <Card style={styles.card}>
          <Text style={styles.marginBottom}>
            {canCancel
              ? "Coś poszło nie tak"
              : "Zamówienie zostało poprawnie anulowane"}
          </Text>
          <Button onPress={() => setShowModal(false)}>OK</Button>
        </Card>
      </Modal>
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  cancelButton: {
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

export default OrderDetailsScreen;
