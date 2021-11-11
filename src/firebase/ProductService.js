import Firebase from "./";

const storesRef = Firebase.firestore().collection("stores");
const storageRef = Firebase.storage().ref();

export const getProducts = async (storeId) => {
  const snapshot = await storesRef.doc(storeId).collection("products").get();
  const products = snapshot.docs.map((product) => ({
    id: product.id,
    ...product.data(),
  }));
  const images = await Promise.all(
    products.map(({ id }) =>
      storageRef
        .child(`${id}.jpg`)
        .getDownloadURL()
        .catch(() => null)
    )
  );
  return products.map((product, i) => ({ ...product, image: images[i] }));
};
