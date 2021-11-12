import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Text } from "@ui-kitten/components";
import useDateFormat from "../../../../hooks/useDateFormat";
import { orderLabels } from "../../../../firebase/OrderService";

const WorkerOrderListItem = ({ item, ...props }) => {
  const navigation = useNavigation();
  const [dateFormatter] = useDateFormat();
  const amount = item.products.reduce(
    (sum, product) => sum + product.amount * product.price,
    0
  );
  const handleOnPress = () => {
    navigation.navigate("WorkerOrderDetails", { order: item });
  };
  return (
    <ListItem
      title={`${item.id} \n(${orderLabels[item.status]})`}
      description={`${dateFormatter(
        new Date(item.startDate)
      )} - ${amount.toFixed(2)} zł`}
      accessoryRight={() => (
        <Text category="s1">ilość: {item.products.length}</Text>
      )}
      onPress={handleOnPress}
      {...props}
    />
  );
};

export default WorkerOrderListItem;
