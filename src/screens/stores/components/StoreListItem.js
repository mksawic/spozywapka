import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { setInitial, setStore } from "../../../store/cartSlice";
const StoreListItem = ({ item, ...props }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(setInitial());
    dispatch(setStore({ id: item.id, name: item.name }));
    navigation.navigate("Products", { store: item });
  };
  return (
    <ListItem
      title={item.name}
      description={item.description.replace(/\\n/g, "\n")}
      onPress={handleOnPress}
      {...props}
    />
  );
};

export default StoreListItem;
