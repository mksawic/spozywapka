import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Text } from "@ui-kitten/components";
import useDateFormat from "../../../hooks/useDateFormat";
import { orderLabels } from "../../../firebase/OrderService";
const OrderListItem = ({ item, ...props }) => {
  const navigation = useNavigation();
  const [dateFormatter] = useDateFormat();
  const amount = item.products.reduce(
    (sum, product) => sum + product.amount * product.price,
    0
  );
  const handleOnPress = () => {
    navigation.navigate("OrderDetails", { order: item });
  };
  return (
    <ListItem
      title={`${item.store.name} (${orderLabels[item.status]})`}
      description={dateFormatter(new Date(item.startDate))}
      accessoryRight={() => <Text category="s1">{amount} zł</Text>}
      onPress={handleOnPress}
      {...props}
    />
  );
};

export default OrderListItem;
