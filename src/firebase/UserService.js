import Firebase from "./";

const usersRef = Firebase.firestore().collection("users");

export const getAllUsers = async () => {
  const snapshot = await usersRef.get();
  return snapshot.docs.map((user) => ({ id: user.id, ...user.data() }));
};

export const getUser = async (id) => {
  const snapshot = await usersRef.doc(id).get();
  return { id, ...snapshot.data() };
};

export const setNewUser = async (data) => {
  await usersRef.doc(data.user.uid).set({
    email: data.user.email,
    store: null,
  });
};
