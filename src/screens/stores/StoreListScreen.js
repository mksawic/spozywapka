import React, { useState, useEffect } from "react";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Input,
  Divider,
  List,
  Text,
} from "@ui-kitten/components";
import AppLoader from "../../components/AppLoader";
import { getAllStores } from "../../firebase/StoreService";
import StoreListItem from "./components/StoreListItem";
import { getAuthMessage } from "../../firebase/codes";

const StoreListScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const getData = () => {
    setRefreshing(true);
    getAllStores()
      .then((res) => setData(res))
      .catch((err) => {
        setError(getAuthMessage(err.code));
        setData([]);
      })
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    getData();
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
        style={styles.list}
        data={data.filter((s) =>
          s.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        ItemSeparatorComponent={Divider}
        renderItem={(props) => <StoreListItem {...props} />}
        onRefresh={getData}
        refreshing={refreshing}
      />
    </Layout>
  ) : (
    <AppLoader />
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  search: {
    margin: 8,
  },
  error: {
    padding: 8,
    alignSelf: "center",
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
});

export default StoreListScreen;
