import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Input,
  Divider,
  List,
  Text,
  Button,
} from "@ui-kitten/components";
import ProductListItem from "./components/ProductListItem";

const WorkerProductListScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const { products, error } = useSelector((state) => state.worker);
  const [search, setSearch] = useState("");

  return (
    <Layout style={styles.container}>
      <Input
        style={styles.search}
        placeholder="Szukaj"
        value={search}
        onChangeText={setSearch}
      />
      {error && (
        <Text style={styles.error} status="danger">
          {error}
        </Text>
      )}
      <List
        style={styles.productList}
        ItemSeparatorComponent={Divider}
        data={products.filter((s) =>
          s.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        numColumns={2}
        renderItem={(props) => (
          <ProductListItem navigation={navigation} {...props} />
        )}
      />

      <Button
        onPress={() =>
          navigation.navigate("WorkerProductDetails", {
            product: { name: "Nazwa", description: "", price: 0, image: null },
          })
        }
        style={styles.floating}
        size="large"
      >
        Dodaj nowy produkt
      </Button>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  productList: {
    flex: 1,
  },
  search: {
    margin: 8,
  },
  error: {
    padding: 8,
    alignSelf: "center",
  },
  floating: {
    position: "absolute",
    width: "80%",
    left: "10%",
    bottom: 20,
  },
});

export default WorkerProductListScreen;
