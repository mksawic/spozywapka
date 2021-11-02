import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@ui-kitten/components";
const StoreListItem = ({ item, ...props }) => {
  const navigation = useNavigation();

  return (
    <ListItem
      title={item.name}
      description={item.description.replace(/\\n/g, "\n")}
      onPress={() => navigation.navigate("Products", { store: item })}
      {...props}
    />
  );
};

export default StoreListItem;
