import React from "react";
import { Image, View } from "react-native";
import {
  ListItem,
  useStyleSheet,
  Text,
  StyleService,
} from "@ui-kitten/components";

const OrderProductItem = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  const placeholder = require("../../../../assets/img/product_placeholder.png");

  return (
    <>
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
          <Text category="s1">{`Ilość: ${item.amount}`}</Text>
        </View>
      </ListItem>
    </>
  );
};

const themedStyles = StyleService.create({
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
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    alignItems: "center",
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: "center",
    width: 40,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});

export default OrderProductItem;
