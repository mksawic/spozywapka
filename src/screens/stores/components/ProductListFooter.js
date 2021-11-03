import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  StyleService,
  useStyleSheet,
  Input,
} from "@ui-kitten/components";
import { MinusIcon, PlusIcon } from "../../../assets/img/Icons";
import {
  addOneProduct,
  removeOneProduct,
  setAmount as setAmountAction,
} from "../../../store/cartSlice";

const ProductListFooter = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  const product = useSelector((state) => state.cart.products[item.id]);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(product?.amount);
  return (
    <View style={styles.itemFooter}>
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
  );
};

const themedStyles = StyleService.create({
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  amount: {
    textAlign: "center",
    width: 40,
  },
  amountButton: {
    borderRadius: 16,
  },
});

export default ProductListFooter;
