import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { setInitial, setStore } from "../../../store/cartSlice";
import useLocation from "../../../hooks/useLocation";
import useDistance from "../../../hooks/useDistance";
const StoreListItem = ({ item, ...props }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [coordinates] = useLocation();
  const calculateDistance = useDistance();
  const [distance, setDistance] = useState(null);
  useEffect(() => {
    coordinates && setDistance(calculateDistance(coordinates, item.geo));
  }, [coordinates]);
  const handleOnPress = () => {
    dispatch(setInitial());
    dispatch(setStore({ id: item.id, name: item.name }));
    navigation.navigate("Products", { store: item });
  };
  return (
    <ListItem
      title={`${item.name} ${distance ? `(${distance} km)` : ""}`}
      description={item.description}
      onPress={handleOnPress}
      {...props}
    />
  );
};

export default StoreListItem;
