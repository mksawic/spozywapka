import React from "react";
import {
  useStyleSheet,
  StyleService,
  ListItem,
  Text,
} from "@ui-kitten/components";
import { Image, View } from "react-native";

const OrderDetailsItem = ({ item }) => {
  const styles = useStyleSheet(themedStyle);
  const placeholder = require("../../../assets/img/product_placeholder.png");
  return (
    <ListItem style={styles.container} disabled>
      <Image
        style={styles.image}
        source={item.image ? { uri: item.image } : placeholder}
      />

      <View style={styles.detailsContainer}>
        <Text category="s1">{item.name}</Text>
        <Text appearance="hint" category="c1">
          {item.description}
        </Text>
        <Text category="s1">{`${item.amount} x ${item.price.toFixed(
          2
        )} zł`}</Text>
      </View>
    </ListItem>
  );
};

const themedStyle = StyleService.create({
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  image: {
    width: 120,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
});

export default OrderDetailsItem;
