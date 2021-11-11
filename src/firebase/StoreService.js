import Firebase from "./";
import { getUser } from "./UserService";

const storesRef = Firebase.firestore().collection("stores");
const auth = Firebase.auth();

export const getAllStores = async () => {
  const snapshot = await storesRef.get();
  return snapshot.docs.map((store) => ({
    id: store.id,
    ...store.data(),
    description: store.data().description.replace(/\\n/g, "\n"),
    geo: {
      latitude: store.data().geo.latitude,
      longitude: store.data().geo.longitude,
    },
  }));
};

export const getStore = async (id) => {
  const store = await storesRef.doc(id).get();
  return {
    id,
    ...store.data(),
    description: store.data().description.replace(/\\n/g, "\n"),
    geo: {
      latitude: store.data().geo.latitude,
      longitude: store.data().geo.longitude,
    },
  };
};
