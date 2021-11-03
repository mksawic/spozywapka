import React from "react";
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";

const SummaryListFooter = () => {
  const styles = useStyleSheet(themedStyle);
  const total = useSelector((state) => state.cart.total);
  return (
    <Layout style={styles.footer}>
      <Text category="h5">Łącznie:</Text>
      <Text category="h5">{total.toFixed(2)} zł</Text>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
});

export default SummaryListFooter;
