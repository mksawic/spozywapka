import Firebase from "./";

const usersRef = Firebase.firestore().collection("users");

export const getAllUsers = async () => {
  const snapshot = await usersRef.get();
  return snapshot.docs.map((user) => ({ id: user.id, ...user.data() }));
};

export const setNewUser = async (data) => {
  await usersRef.doc(data.uid).set({
    email: data.user.email,
    store: null,
  });
};
