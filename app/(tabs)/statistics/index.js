// /app/(tabs)/statistics/index.js
import { Stack } from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { View, Text, Dimensions, SafeAreaView, ScrollView, Pressable, StyleSheet  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../../styles.js';
import StatisticsField from '../../../components/statisticsField.jsx';
import { useFonts } from 'expo-font';

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

  function Comparator(a, b) {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  }

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
      
      const dataPrefixString = "date_";
      let ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 91);
      let comparisonDate = new Date();
      // go through all items, check if it's a date entry
      for (let x in items) {
        let item = items[x];
        
        // only use date-entries
        if (item[0].startsWith(dataPrefixString)) {
          comparisonDate.setFullYear(item[0].substring(5,9));
          // months are zero-based...
          comparisonDate.setMonth(item[0].substring(9,11)-1);
          comparisonDate.setDate(item[0].substring(11,13));

          if (comparisonDate > ninetyDaysAgo) {
            // ignore data older than 90 days
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
        }
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
          <View style={{padding: 8}}>
            <Text style={styles.regularText}>
              This shows your statistics for the last 90 days. {"\n"}{"\n"}
              You have tracked your tanks on {numberEntries} days.{"\n"}{"\n"}
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
