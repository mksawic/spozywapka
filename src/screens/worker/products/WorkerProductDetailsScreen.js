import React, { useEffect, useState } from "react";
import {
  Layout,
  StyleService,
  Input,
  useStyleSheet,
  Text,
  Button,
} from "@ui-kitten/components";
import { useLoaderContext } from "../../../contexts/LoaderContext";
import usePriceValidation from "../../../hooks/usePriceValidation";
import { ImageBackground } from "react-native";
import { TrashIcon } from "../../../assets/img/Icons";
import { TouchableOpacity } from "react-native";
import useSelectImage from "../../../hooks/useSelectImage";
import uploadImageAsync, {
  deleteImageAsync,
} from "../../../firebase/StorageService";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../../firebase/ProductService";
import { getWorkerProducts } from "../../../store/workerSlice";
import { ScrollView } from "react-native-gesture-handler";

const WorkerProductDetailsScreen = ({ navigation, route }) => {
  const placeholder = require("../../../assets/img/product_placeholder.png");
  const styles = useStyleSheet(themedStyles);
  const { setLoading } = useLoaderContext();
  const store = useSelector((state) => state.worker.store);
  const dispatch = useDispatch();
  const [isPriceValid, validatePrice] = usePriceValidation();
  const [selectedImage, openImagePickerAsync] = useSelectImage();
  const [product, setProduct] = useState(route?.params?.product);

  const handleChange = (value, key) => {
    if (key === "price") validatePrice(product.price);
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (selectedImage) handleChange(selectedImage.uri, "image");
  }, [selectedImage]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (product?.id) {
        await updateProduct(store.id, product);
        if (!selectedImage && !product?.image)
          await deleteImageAsync(product.id);
      } else {
        const productRef = await addProduct(store.id, product);
        product.id = productRef.id;
      }
      if (selectedImage) await uploadImageAsync(selectedImage.uri, product.id);
      dispatch(getWorkerProducts());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigation.navigate("WorkerProductList");
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProduct(store.id, product.id);
      dispatch(getWorkerProducts());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigation.navigate("WorkerProductList");
    }
  };

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <TouchableOpacity onPress={() => openImagePickerAsync()}>
          <ImageBackground
            style={styles.image}
            source={product.image ? { uri: product.image } : placeholder}
          >
            {product.image && (
              <Button
                status="danger"
                size="small"
                style={styles.trashButton}
                accessoryLeft={TrashIcon}
                onPress={() => handleChange(null, "image")}
              />
            )}
          </ImageBackground>
        </TouchableOpacity>

        <Input
          value={product.name}
          style={styles.marginBottom}
          label="Nazwa"
          onChangeText={(value) => handleChange(value, "name")}
          status={!product.name ? "danger" : "basic"}
        />
        {!product.name && (
          <Text appearance="hint" category="c1" status="danger">
            Nazwa jest wymagana
          </Text>
        )}
        <Input
          multiline
          style={styles.marginBottom}
          textAlignVertical="top"
          textStyle={{ minHeight: 50 }}
          value={product.description}
          label="Opis"
          onChangeText={(value) => handleChange(value, "description")}
        />

        <Input
          value={product.price.toString()}
          style={styles.marginBottom}
          label="Cena"
          onChangeText={(value) => handleChange(value, "price")}
          keyboardType="decimal-pad"
          status={!isPriceValid ? "danger" : "basic"}
        />
        {!isPriceValid && (
          <Text appearance="hint" category="c1" status="danger">
            Nieprawidłowa cena
          </Text>
        )}
        <Button
          style={styles.button}
          onPress={handleSave}
          size="large"
          disabled={!isPriceValid || !product.name}
        >
          Zapisz
        </Button>
        {product?.id && (
          <Button status="danger" onPress={handleDelete} size="large">
            Usuń
          </Button>
        )}
      </Layout>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 8,
  },
  marginBottom: {
    marginBottom: 10,
  },
  image: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    width: 250,
    height: 150,
  },
  button: {
    marginTop: 16,
    marginBottom: 10,
  },
  trashButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});

export default WorkerProductDetailsScreen;
