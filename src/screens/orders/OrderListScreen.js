import React, { useState, useEffect } from "react";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Divider,
  List,
  Text,
} from "@ui-kitten/components";
import AppLoader from "../../components/AppLoader";
import { getAuthMessage } from "../../firebase/codes";
import { getOrders } from "../../firebase/OrderService";
import OrderListItem from "./components/OrderListItem";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../store/orderSlice";

const OrderListScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const getData = () => {
    setRefreshing(true);
    getOrders()
      .then((res) => dispatch(setOrders(res)))
      .catch((err) => setError(getAuthMessage(err.code)))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return orders ? (
    <Layout style={styles.container}>
      {error && (
        <Text style={styles.message} status="danger">
          {error}
        </Text>
      )}
      {!orders.length && <Text style={styles.message}>Brak zamówień</Text>}
      <List
        style={styles.list}
        data={orders}
        ItemSeparatorComponent={Divider}
        renderItem={(props) => <OrderListItem {...props} />}
        onRefresh={getData}
        refreshing={refreshing}
      />
    </Layout>
  ) : (
    <AppLoader />
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  message: {
    padding: 8,
    alignSelf: "center",
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
});

export default OrderListScreen;
