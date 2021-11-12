import React from "react";
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { orderLabels } from "../../../../firebase/OrderService";
import { View } from "react-native";
import useDateFormat from "../../../../hooks/useDateFormat";

const OrderProductHeader = ({ order }) => {
  const styles = useStyleSheet(themedStyles);
  const [dateFormatter] = useDateFormat();
  return (
    <Layout>
      <View style={styles.header}>
        <Text category="s1">Status: {orderLabels[order.status]}</Text>
        <Text category="s1">{dateFormatter(new Date(order.startDate))}</Text>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
});

export default OrderProductHeader;
