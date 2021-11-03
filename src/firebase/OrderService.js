import Firebase from "./";

const ordersRef = Firebase.firestore().collection("orders");
const auth = Firebase.auth();

export const addNewOrder = async (products, store) => {
  return await ordersRef.add({
    products,
    store,
    status: 1,
    user: auth.currentUser.uid,
    worker: null,
    startDate: new Date(),
    endDate: null,
  });
};
