// /app/(tabs)/home/index.js
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../../../styles.js';
import MySlider from '../../../components/MySlider.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDateStringFromToday } from '../../../utility/utility.js';
import { useFonts } from 'expo-font';

export default function Page() {

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../assets/fonts/Aquire-BW0ox.otf')
  });

  // todo: on startup, read values from file
  const [emotional, setEmotional] = useState(0);
  const [physical, setPhysical] = useState(0);
  const [mental, setMental] = useState(0);
  const [spiritual, setSpiritual] = useState(0);
  const [buttonTitle, setButtonTitle] = useState("Submit");
  const [welcomeMessage, setWelcomeMessage] = useState("How full are your buckets today?");
  const [submitted, setSubmitted] = useState(false);

  function updateBucketValues(update) {
    if (update.name == "Emotional") {
      setEmotional(update.value);
    }
    if (update.name == "Physical") {
      setPhysical(update.value);
    }
    if (update.name == "Mental") {
      setMental(update.value);
    }
    if (update.name == "Spiritual") {
      setSpiritual(update.value);
    }
    // todo: write to file or global variable
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      const date = createDateStringFromToday();
      await AsyncStorage.setItem(date, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  function onSubmitBuckets() {
    storeData({emotional: emotional, physical: physical, spiritual: spiritual, mental: mental});
    setSubmitted(true);
    // todo write to file
    setButtonTitle("Update");
    setWelcomeMessage("You've submitted today, but you can update it here:")
  } 

  //AsyncStorage.clear();

  return (
    <>
    <Stack.Screen options={{headerShown: false, title: 'Today'}}></Stack.Screen>
    <View style={styles.container}>
        <View style={{height: 20}}></View>
        <View style={{alignContent: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Text style={styles.homeTabHeading}>{welcomeMessage}</Text>
        </View>
        <StatusBar style="auto"></StatusBar>
        <MySlider title="Physical" callBackUpdate={updateBucketValues}/>
        <MySlider title="Emotional" callBackUpdate={updateBucketValues} />
        <MySlider title="Spiritual" callBackUpdate={updateBucketValues}/>
        <MySlider title="Mental" callBackUpdate={updateBucketValues}/>
        
        <Pressable onPress={onSubmitBuckets} style={styles.homeButton}>
          <Text style={styles.homeButtonText}>{buttonTitle}</Text>
        </Pressable>
        
        <View style={{height: 20}}></View>
    </View>
    </>
  );
}

