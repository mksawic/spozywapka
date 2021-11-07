import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        setCoordinates({ latitude, longitude });
      }
      setIsLoading(false);
    })();
  }, []);

  return [coordinates, isLoading];
};

export default useLocation;
