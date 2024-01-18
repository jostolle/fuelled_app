// /app/index.js
import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// notifee.onBackgroundEvent(async ({type, detail}) => {
//   switch(type) {
//     case EventType.ACTION_PRESS:
//       await notifee.cancelNotification(detail.notification.id)
//   }
// })

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

  useEffect(() => {
    requestNotifications()
  }, []);

  const requestNotifications = async () => {
    await notifee.requestPermission()
  }

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Redirect href={"/(tabs)/home"} />;
}