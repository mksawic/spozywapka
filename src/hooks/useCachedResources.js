import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "inter-regular": require("../assets/fonts/Inter-Regular.ttf"),
          "inter-medium": require("../assets/fonts/Inter-Medium.ttf"),
          "inter-semibold": require("../assets/fonts/Inter-SemiBold.ttf"),
        });
      } catch (loadCachedResourcesError) {
        console.log(loadCachedResourcesError);
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
