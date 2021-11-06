import Firebase from "./";

const ordersRef = Firebase.firestore().collection("orders");
const auth = Firebase.auth();

export const orderLabels = {
  1: "Zaplanowano",
  2: "W trakcie realizacji",
  3: "Gotowe do odbioru",
  4: "Odebrano",
  5: "Anulowano",
};

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

export const getOrders = async () => {
  const snapshot = await ordersRef
    .where("user", "==", auth.currentUser.uid)
    .get();
  return snapshot.docs
    .map((order) => ({
      id: order.id,
      ...order.data(),
      startDate: order.data().startDate.toMillis(),
      endDate: order.data().endDate?.toMillis(),
    }))
    .sort((a, b) => b.startDate - a.startDate);
};

export const cancelOrder = async (order) => {
  return await ordersRef.doc(order.id).update({
    status: 5,
  });
};
