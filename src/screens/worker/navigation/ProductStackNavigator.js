import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkerProductListScreen from "../products/WorkerProductListScreen";
import WorkerProductDetailsScreen from "../products/WorkerProductDetailsScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="WorkerProductList"
        component={WorkerProductListScreen}
        options={{ title: "Produkty", headerTitleAlign: "center" }}
      />
      <Screen
        name="WorkerProductDetails"
        component={WorkerProductDetailsScreen}
        options={{ title: "Produkt", headerTitleAlign: "center" }}
      />
    </Navigator>
  );
};

export default ProductStackNavigator;
