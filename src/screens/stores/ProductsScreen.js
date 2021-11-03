import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { setProducts } from "../../store/cartSlice";
import ProductListItem from "./components/ProductListItem";
import AppLoader from "../../components/AppLoader";
import { getAllProducts } from "../../firebase/ProductService";

const ProductsScreen = ({ navigation, route }) => {
  const styles = useStyleSheet(themedStyles);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  const store = route?.params?.store;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllProducts(store)
      .then((res) => {
        setData(res);
        dispatch(setProducts(res));
      })
      .catch((err) => {
        setError(err.message);
        setData([]);
      });
  }, []);
  return data ? (
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
        data={data.filter((s) =>
          s.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        numColumns={2}
        renderItem={(props) => <ProductListItem {...props} />}
      />
      <Button
        onPress={() => navigation.navigate("Summary")}
        style={styles.floating}
        size="large"
        disabled={total === 0}
      >
        {`${total.toFixed(2)} zł`}
      </Button>
    </Layout>
  ) : (
    <AppLoader />
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
    right: 20,
    bottom: 20,
  },
});

export default ProductsScreen;
