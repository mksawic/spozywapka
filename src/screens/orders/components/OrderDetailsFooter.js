import React from "react";
import {
  Layout,
  Text,
  useStyleSheet,
  StyleService,
} from "@ui-kitten/components";
import { View } from "react-native";
import { orderLabels } from "../../../firebase/OrderService";

const OrderDetailsFooter = ({ order }) => {
  const styles = useStyleSheet(themedStyle);
  const amount = order.products.reduce(
    (sum, product) => sum + product.amount * product.price,
    0
  );
  return (
    <Layout style={styles.footer}>
      <View style={styles.row}>
        <Text category="h5">Status:</Text>
        <Text category="h5">{orderLabels[order.status]}</Text>
      </View>
      <View style={styles.row}>
        <Text category="h5">Suma:</Text>
        <Text category="h5">{amount.toFixed(2)} zł</Text>
      </View>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  footer: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 0.5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default OrderDetailsFooter;
