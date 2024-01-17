// /app/(tabs)/statistics/index.js
import { Stack } from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { View, Text, Dimensions, SafeAreaView, ScrollView, Pressable, StyleSheet  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../../styles.js';
import StatisticsField from '../../../components/statisticsField.jsx';
import { useFonts } from 'expo-font';
import { Comparator, DataPrefixString } from '../../../utility/utility.js';

export default function Page() {
  const [emotional, setEmotional] = useState(0);
  const [physical, setPhysical] = useState(0);
  const [mental, setMental] = useState(0);
  const [spiritual, setSpiritual] = useState(0);
  const [emotionalData, setEmotionalData] = useState([]);
  const [physicalData, setPhysicalData] = useState([]);
  const [mentalData, setMentalData] = useState([]);
  const [spiritualData, setSpiritualData] = useState([]);
  const [numberEntries, setNumberEntries] = useState([]);
  const [heading, setHeading] = useState("Statistics");

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../assets/fonts/Aquire-BW0ox.otf')
  });

  // retrieve data
  const getData = async () => {
    try {
      let entryCounter = 0;
      let runningData = [0,0,0,0];
      let eData = [];
      let pData = [];
      let mData = [];
      let sData = [];

      // ask for all keys and items
      const keys = await AsyncStorage.getAllKeys()
      const items = await AsyncStorage.multiGet(keys)
      items.sort(Comparator);
      //console.log(keys);
      //console.log(items);

      // go through all items, check if it's a date entry
      for (let x in items) {
        let item = items[x];
        // only use date-entries
        if (item[0].startsWith(DataPrefixString)) {
          var data = JSON.parse(item[1]);
          runningData[0]+=data.emotional;
          eData.push(data.emotional);
          runningData[1]+=data.mental;
          mData.push(data.mental);
          runningData[2]+=data.physical;
          pData.push(data.physical);
          runningData[3]+=data.spiritual;
          sData.push(data.spiritual);
          entryCounter++;
        }
        // ignore the rest
      }
      if (entryCounter > 0) {
        // update averages 
        setEmotional(Math.ceil(runningData[0]/entryCounter));
        setMental(Math.ceil(runningData[1]/entryCounter));
        setPhysical(Math.ceil(runningData[2]/entryCounter));
        setSpiritual(Math.ceil(runningData[3]/entryCounter));

        // update data sets
        setEmotionalData(eData);
        setMentalData(mData);
        setPhysicalData(pData);
        setSpiritualData(sData);
      }

      // update counter
      setNumberEntries(entryCounter);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };


  useEffect(() => {
    getData();
 }, []);

  return (
    <>
    <Stack.Screen options={{headerShown: false, title: 'Statistics'}}></Stack.Screen>
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.statisticsContainer} onLayout={getData}>
        <View style={{height: 40}}></View>
        <Text style={styles.homeTabHeading}>{heading}</Text>
        <StatusBar style="auto"></StatusBar>
        { numberEntries == 0 ? 
          <View style={{padding: 16}}>
            <Text style={styles.regularText}>
              There is no data yet.
            </Text>
          </View>
          : "" }
        { numberEntries > 0 ?
          <>
          <View style={{padding: 16}}>
            <Text style={styles.regularText}>
              You have tracked your values on {numberEntries} different days.
              Below you see your overall average as well as a graph of all the entries.
            </Text>
          </View>
          <View style={{height: 40}}></View>
          <View style={{}}>
            <StatisticsField data={physicalData} average={physical} title="Physical"></StatisticsField>
            <StatisticsField data={emotionalData} average={emotional} title="Emotional"></StatisticsField>
            <StatisticsField data={spiritualData} average={spiritual} title="Spiritual"></StatisticsField>
            <StatisticsField data={mentalData} average={mental} title="Mental"></StatisticsField>
          </View>
          <View style={{height: 20}}></View>
          </>
          : ""
        }
      </View>
    </ScrollView>
    </>
  );
}
