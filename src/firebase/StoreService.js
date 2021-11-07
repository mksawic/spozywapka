import Firebase from "./";

const storesRef = Firebase.firestore().collection("stores");

export const getAllStores = async () => {
  const snapshot = await storesRef.get();
  return snapshot.docs.map((store) => ({
    id: store.id,
    ...store.data(),
    description: store.data().description.replace(/\\n/g, "\n"),
  }));
};
