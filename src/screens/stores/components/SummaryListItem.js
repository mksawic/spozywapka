import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import {
  Button,
  ListItem,
  useStyleSheet,
  Text,
  StyleService,
  Input,
} from "@ui-kitten/components";
import { CloseIcon, MinusIcon, PlusIcon } from "../../../assets/img/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addOneProduct,
  removeOneProduct,
  resetAmount,
  setAmount as setAmountAction,
} from "../../../store/cartSlice";

const SummaryListItem = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  const placeholder = require("../../../assets/img/product_placeholder.png");
  const product = useSelector((state) => state.cart.products[item.id]);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(product?.amount);
  useEffect(() => {
    if (Number.isInteger(product?.amount)) setAmount(product?.amount);
  }, [product]);
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
        <Text category="s1">{`${item.price.toFixed(2)} zł`}</Text>
        <View style={styles.amountContainer}>
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size="tiny"
            accessoryLeft={MinusIcon}
            onPress={() => dispatch(removeOneProduct(item))}
            disabled={product?.amount < 1}
          />
          <Input
            size="small"
            value={amount ? amount.toString() : null}
            onChangeText={(value) => setAmount(Number(value))}
            onBlur={() => dispatch(setAmountAction({ item, amount }))}
            textStyle={{ textAlign: "center" }}
            keyboardType="decimal-pad"
            placeholder="0"
          />
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size="tiny"
            accessoryLeft={PlusIcon}
            onPress={() => dispatch(addOneProduct(item))}
          />
        </View>
      </View>
      <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance="ghost"
        status="basic"
        accessoryLeft={CloseIcon}
        onPress={() => dispatch(resetAmount(item))}
      />
    </ListItem>
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

export default SummaryListItem;
