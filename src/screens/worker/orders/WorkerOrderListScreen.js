import React from "react";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Divider,
  List,
  Text,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../../../components/AppLoader";
import WorkerOrderListItem from "./components/WorkerOrderListItem";
import { getOrdersByStoreAction } from "../../../store/workerSlice";

const WorkerOrderListScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const { orders, refreshing, error } = useSelector((store) => store.worker);
  const dispatch = useDispatch();
  return !refreshing || orders ? (
    <Layout style={styles.container}>
      {error && (
        <Text style={styles.message} status="danger">
          {error}
        </Text>
      )}
      {!orders?.length && <Text style={styles.message}>Brak zamówień</Text>}
      <List
        style={styles.list}
        data={orders}
        ItemSeparatorComponent={Divider}
        renderItem={(props) => <WorkerOrderListItem {...props} />}
        onRefresh={() => dispatch(getOrdersByStoreAction())}
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

export default WorkerOrderListScreen;
