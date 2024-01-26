// /app/(tabs)/home/index.js
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, useCallback, useEffect, useRef } from 'react';
import { View, ScrollView, Text, Pressable, AppState } from 'react-native';
import { mainFont1, mainFontColor, styles } from '../../../styles.js';
import MySlider from '../../../components/MySlider.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InitialSliderValue, createDateStringFromToday } from '../../../utility/utility.js';
import { useFonts } from 'expo-font';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Page() {

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../assets/fonts/Aquire-BW0ox.otf')
  });

  const headingSubmitToday = "How full are your tanks today?";
  const updatedValuesText = "You've submitted today, but you can update the values.";

  const INITIALVALUE = InitialSliderValue;

  // todo: on startup, read values from file
  const [emotional, setEmotional] = useState(INITIALVALUE);
  const [physical, setPhysical] = useState(INITIALVALUE);
  const [mental, setMental] = useState(INITIALVALUE);
  const [spiritual, setSpiritual] = useState(INITIALVALUE);
  const [buttonTitle, setButtonTitle] = useState("Submit");
  const [welcomeMessage, setWelcomeMessage] = useState(headingSubmitToday);
  const [submitted, setSubmitted] = useState(false);
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
        // reset UI
        setSubmitted(false);
        setButtonTitle("Submit");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    // if app becomes active => update values
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        nextAppState === 'active'
      ) {
        // check if there's data from today
        getTodayValue();
        // trigger refresh of Slider
        setRefresh(true);
        setRefresh(false);
      }

      return () => {
        subscription.remove();
      }
    });
    // also: check values initially
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
        <MySlider title="Physical" refresh={refresh} callBackUpdate={updateBucketValues}/>
        <MySlider title="Emotional" refresh={refresh} callBackUpdate={updateBucketValues} />
        <MySlider title="Spiritual" refresh={refresh} callBackUpdate={updateBucketValues}/>
        <MySlider title="Mental" refresh={refresh} callBackUpdate={updateBucketValues}/>
        
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

