import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { Dimensions, View } from "react-native";
import AppLoader from "../../components/AppLoader";
import useLocation from "../../hooks/useLocation";
import { useDispatch, useSelector } from "react-redux";
import useDistance from "../../hooks/useDistance";
import { setInitial, setStore } from "../../store/cartSlice";

const StoreMapScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const stores = useSelector((state) => state.stores.data);
  const dispatch = useDispatch();
  const [coordinates, isLoading] = useLocation();
  const calculateDistance = useDistance();
  const [location, setLocation] = useState({
    latitude: 52.23200225614471,
    longitude: 21.006027184971423,
  });
  useEffect(() => {
    coordinates && setLocation(coordinates);
  }, [coordinates]);
  const handleOrder = (store) => {
    dispatch(setInitial());
    dispatch(setStore({ id: store.id, name: store.name }));
    navigation.navigate("Products", { store });
  };
  return !isLoading && stores ? (
    <Layout style={styles.container}>
      <MapView
        initialRegion={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker coordinate={{ ...location }} title="Twoje położenie" />
        {stores.map((store) => (
          <Marker key={store.id} coordinate={{ ...store.geo }} pinColor="green">
            <Callout onPress={() => handleOrder(store)}>
              <View style={styles.pinCallout}>
                <Text category="s1">{`${store.name} ${
                  coordinates
                    ? `(${calculateDistance(coordinates, store.geo)} km)`
                    : ""
                }`}</Text>
                <Text appearance="hint">{store.description}</Text>
                <Button appearance="ghost">Zamów</Button>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </Layout>
  ) : (
    <AppLoader />
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  pinCallout: {
    maxWidth: 250,
    padding: 4,
  },
});

export default StoreMapScreen;
