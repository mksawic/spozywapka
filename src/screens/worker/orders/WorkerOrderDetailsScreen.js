import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Layout,
  List,
  useStyleSheet,
  StyleService,
  Button,
  Modal,
  Card,
  Text,
} from "@ui-kitten/components";
import OrderProductItem from "./components/OrderProductItem";
import { View } from "react-native";
import { updateOrderAction } from "../../../store/workerSlice";
import { useLoaderContext } from "../../../contexts/LoaderContext";
import AppLoader from "../../../components/AppLoader";
import OrderProductHeader from "./components/OrderProductHeader";

const WorkerOrderDetailsScreen = ({ route }) => {
  const styles = useStyleSheet(themedStyles);
  const { setLoading } = useLoaderContext();
  const dispatch = useDispatch();
  const { orders, refreshing } = useSelector((state) => state.worker);
  const { id } = route?.params?.order;
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setLoading(refreshing);
    if (id && orders) {
      setOrder(orders.find((order) => order.id === id));
    }
  }, [refreshing]);

  return order ? (
    <>
      <Layout style={styles.container} level="2">
        <List
          data={order.products}
          renderItem={(props) => <OrderProductItem {...props} />}
          ListHeaderComponent={(props) => (
            <OrderProductHeader order={order} {...props} />
          )}
        />
        <View>
          {order.status === 1 && (
            <Button
              onPress={() =>
                dispatch(updateOrderAction({ ...order, status: 2 }))
              }
              style={styles.button}
              size="large"
            >
              Rozpocznij zamówienie
            </Button>
          )}
          {order.status === 2 && (
            <Button
              onPress={() =>
                dispatch(updateOrderAction({ ...order, status: 3 }))
              }
              style={styles.button}
              size="large"
            >
              Gotowe do odbioru
            </Button>
          )}
          {order.status === 3 && (
            <Button
              onPress={() =>
                dispatch(updateOrderAction({ ...order, status: 4 }))
              }
              style={styles.button}
              size="large"
            >
              Odebrano
            </Button>
          )}
          {order.status !== 5 && order.status !== 4 && (
            <Button
              onPress={() => setShowModal(true)}
              appearance="outline"
              style={styles.button}
              size="large"
            >
              Anuluj zamówienie
            </Button>
          )}
        </View>
      </Layout>
      <Modal visible={showModal} backdropStyle={styles.backdrop}>
        <Card style={styles.card}>
          <Text style={styles.marginBottom}>
            Czy na pewno chcesz anulować to zamówienie?
          </Text>
          <View style={styles.buttonWrapper}>
            <Button
              appearance="outline"
              style={styles.buttonDialog}
              onPress={() => setShowModal(false)}
            >
              Nie
            </Button>
            <Button
              style={styles.buttonDialog}
              onPress={() => {
                setShowModal(false);
                dispatch(updateOrderAction({ ...order, status: 5 }));
              }}
            >
              Tak
            </Button>
          </View>
        </Card>
      </Modal>
    </>
  ) : (
    <AppLoader />
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonDialog: {
    width: "45%",
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

export default WorkerOrderDetailsScreen;
