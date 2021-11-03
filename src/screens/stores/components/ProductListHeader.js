import React from "react";
import { Image } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

const ProductListHeader = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  const placeholder = require("../../../assets/img/product_placeholder.png");

  return (
    <Image
      style={styles.itemHeader}
      source={item.image ? { uri: item.image } : placeholder}
      loadingIndicatorSource={placeholder}
    />
  );
};

const themedStyles = StyleService.create({
  itemHeader: {
    height: 140,
  },
});

export default ProductListHeader;
