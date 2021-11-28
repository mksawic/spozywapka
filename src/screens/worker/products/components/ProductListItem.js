import React from "react";
import { Dimensions } from "react-native";
import { Card, StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import ProductListHeader from "./ProductListHeader";

const ProductListItem = ({ item, navigation }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Card
      onPress={() =>
        navigation.navigate("WorkerProductDetails", { product: item })
      }
      header={() => <ProductListHeader item={item} />}
      style={styles.productItem}
    >
      <Text category="s1">{item.name}</Text>
      <Text appearance="hint" category="c1">
        {item.description}
      </Text>
      <Text category="s1">{`${item.price.toFixed(2)} zł`}</Text>
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
