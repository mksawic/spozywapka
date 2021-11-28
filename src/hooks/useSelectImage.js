import React from "react";
import * as ImagePicker from "expo-image-picker";

const useSelectImage = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Nie otrzymano uprawnień do kamery");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage(pickerResult);
  };

  return [selectedImage, openImagePickerAsync];
};

export default useSelectImage;
