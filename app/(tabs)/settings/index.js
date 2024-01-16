// /app/(tabs)/settings/index.js

import { Stack } from 'expo-router';
import {StatusBar} from 'expo-status-bar'
import { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Switch, StyleSheet  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, colorBurnout, colorHealthy, colorWatchit } from '../../../styles.js';
import { createDateStringFromToday, createDateStringFromDate, getRandomInt } from '../../../utility/utility.js';
import { useFonts } from 'expo-font';

export default function Page() {

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../assets/fonts/Aquire-BW0ox.otf')
  });
  const [heading, setHeading] = useState("Settings");

  const generateData = async () => {
    try {
      var today = new Date();
      for (let index = 0; index < 180; index++) {
        // try get Data
        const date = createDateStringFromDate(today);
        value = {emotional: getRandomInt(100), physical: getRandomInt(100), spiritual: getRandomInt(100), mental: getRandomInt(100)};
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(date, jsonValue);
        // update date for next loop iteration
        today.setDate(today.getDate()-1);
      } 
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
    <Stack.Screen options={{headerShown: false, title: 'Settings'}}></Stack.Screen>
    <SafeAreaView style={styles.settingsContainer}>
        <View style={{height: 40}}></View>
        <Text style={styles.homeTabHeading}>{heading}</Text>
        <StatusBar style="auto"></StatusBar>

        <Pressable onPress={generateData} style={styles.statisticsButton}>
          <Text style={styles.statisticsButtonText}>Generate Random Data</Text>
        </Pressable>
        <View>
          <Text>Icons from Freepik und UIcons</Text>
        </View>
    </SafeAreaView>
    </>
  );
}
