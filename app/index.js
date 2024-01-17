// /app/index.js

import { Redirect } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Page() {

  const [fontsLoaded, fontError] = useFonts({
    'Questrial': require('../assets/fonts/questrial.ttf'),
    'Aquire': require('../assets/fonts/Aquire-BW0ox.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Redirect href={"/(tabs)/home"} />;
}