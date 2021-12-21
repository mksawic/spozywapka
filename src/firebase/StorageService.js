import Firebase from "./";

const storageRef = Firebase.storage().ref();

const uploadImageAsync = async (uri, id) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = storageRef.child(id + ".jpg");
  await fileRef.put(blob);

  // We're done with the blob, close and release it
  blob.close();
};

export const deleteImageAsync = async (id) => {
  await storageRef.child(`${id}.jpg`).delete();
};

export default uploadImageAsync;
