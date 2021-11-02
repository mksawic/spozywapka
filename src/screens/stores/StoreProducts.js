import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";

const StoreProducts = ({ navigation, route }) => {
  const store = route?.params?.store;
  return (
    <Layout>
      <Text>Produkty</Text>
    </Layout>
  );
};

export default StoreProducts;
