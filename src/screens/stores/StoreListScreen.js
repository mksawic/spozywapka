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
import StoreListItem from "./components/StoreListItem";
import { useDispatch, useSelector } from "react-redux";
import { getStoresAction } from "../../store/storeSlice";
import useLocation from "../../hooks/useLocation";
import useDistance from "../../hooks/useDistance";

const StoreListScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const { data, refreshing, error } = useSelector((state) => state.stores);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const [coordinates] = useLocation();
  const calculateDistance = useDistance();
  const sortByDistance = (a, b) => {
    return (
      calculateDistance(coordinates, a.geo) -
      calculateDistance(coordinates, b.geo)
    );
  };

  const list = data?.filter((s) =>
    s.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  useEffect(() => {
    dispatch(getStoresAction());
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
        data={coordinates ? list.sort(sortByDistance) : list}
        ItemSeparatorComponent={Divider}
        renderItem={(props) => <StoreListItem {...props} />}
        onRefresh={() => dispatch(getStoresAction())}
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
