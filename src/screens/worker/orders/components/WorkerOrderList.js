import React, { useState } from "react";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Divider,
  List,
  Text,
  Input,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../../../../components/AppLoader";
import WorkerOrderListItem from "./WorkerOrderListItem";
import { getOrdersByStoreAction } from "../../../../store/workerSlice";
import { View } from "react-native";

const WorkerOrderList = ({ statusToDisplay }) => {
  const styles = useStyleSheet(themedStyles);
  const { orders, refreshing, error } = useSelector((store) => store.worker);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  return !refreshing || orders ? (
    <Layout style={styles.container}>
      <Input
        style={styles.search}
        placeholder="Szukaj ID"
        value={search}
        onChangeText={setSearch}
      />
      {error && (
        <Text style={styles.message} status="danger">
          {error}
        </Text>
      )}
      {!orders?.length && <Text style={styles.message}>Brak zamówień</Text>}
      {orders && (
        <List
          style={styles.list}
          data={orders
            .filter((order) =>
              statusToDisplay ? statusToDisplay.includes(order.status) : true
            )
            .filter(({ id }) =>
              id.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            )}
          ItemSeparatorComponent={Divider}
          renderItem={(props) => <WorkerOrderListItem {...props} />}
          onRefresh={() => dispatch(getOrdersByStoreAction())}
          refreshing={refreshing}
        />
      )}
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
  search: {
    margin: 8,
  },
});

export default WorkerOrderList;
