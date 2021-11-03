import React from "react";
import { Dimensions } from "react-native";
import { Card, StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import ProductListHeader from "./ProductListHeader";
import ProductListFooter from "./ProductListFooter";

const ProductListItem = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Card
      style={styles.productItem}
      header={() => <ProductListHeader item={item} />}
      footer={() => <ProductListFooter item={item} />}
      disabled
    >
      <Text category="s1">{item.name}</Text>
      <Text appearance="hint" category="c1">
        {item.description}
      </Text>
      <Text category="s1">{`${item.price} zł`}</Text>
    </Card>
  );
};

const themedStyles = StyleService.create({
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get("window").width / 2 - 24,
  },
});

export default ProductListItem;
