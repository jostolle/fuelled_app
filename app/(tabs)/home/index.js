// /app/(tabs)/home/index.js
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';
import { mainFont1, mainFontColor, styles } from '../../../styles.js';
import MySlider from '../../../components/MySlider.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDateStringFromToday } from '../../../utility/utility.js';
import { useFonts } from 'expo-font';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Page() {

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../assets/fonts/Aquire-BW0ox.otf')
  });

  const headingSubmitToday = "How full are your tanks today?";
  const updatedValuesText = "You've submitted today, but you can update the values.";

  // todo: on startup, read values from file
  const [emotional, setEmotional] = useState(50);
  const [physical, setPhysical] = useState(50);
  const [mental, setMental] = useState(50);
  const [spiritual, setSpiritual] = useState(50);
  const [buttonTitle, setButtonTitle] = useState("Submit");
  const [welcomeMessage, setWelcomeMessage] = useState(headingSubmitToday);
  const [submitted, setSubmitted] = useState(false);
  const [submitConfirm, setSubmitConfirm] = useState(false);

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
    setButtonTitle("Update");
    setSubmitConfirm(true);
    setTimeout(toggleSubmitConfirm,1000);
  } 

  function toggleSubmitConfirm() {
    setSubmitConfirm(false);
  }

  const getTodayValue = async () => {
    // fetch today's value
    try {
      const date = createDateStringFromToday();
      const value = await AsyncStorage.getItem(date);
      if (value != null) {
        setSubmitted(true);
        setButtonTitle("Update");
      } else {
        setSubmitted(false);
        setButtonTitle("Submit");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getTodayValue();
 }, []);

  return (
    <>
    <Stack.Screen options={{headerShown: false, title: 'Today'}}></Stack.Screen>
    <ScrollView style={styles.scrollViewContainer}>
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
        
        <View style={{height: 20}}></View>
        <View flexDirection='row'>
          <View>
            <Pressable onPress={onSubmitBuckets} 
              style={({pressed}) => [
                styles.homeButton,
                {
                  backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                }
            ]}>
              <Text style={styles.homeButtonText}>
                {buttonTitle}
                { submitConfirm ?
              <FontAwesome
              size={18}
              style={{ paddingLeft: 8 }}
              name="check"
              color={mainFontColor}
            />
              : null }
              
              </Text>
              
            </Pressable>
          </View>
        </View>
        
        { submitted ?
          <View style={{padding: 16}}>
            <Text style={styles.regularText}>
              { updatedValuesText }
            </Text>
          </View>
          : null }
      </View>
      <View style={{height: 20}}></View>
    </ScrollView>
    </>
  );
}

