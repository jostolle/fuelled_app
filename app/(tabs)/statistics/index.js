// /app/(tabs)/statistics/index.js
import { Stack } from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, Dimensions, SafeAreaView, ScrollView, Pressable, StyleSheet  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, colorBurnout, colorHealthy, colorWatchit } from '../../../styles.js';
import { createDateStringFromToday, createDateStringFromDate, getRandomInt } from '../../../utility/utility.js';
import { useFonts } from 'expo-font';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function Page() {
  const [emotional, setEmotional] = useState(0);
  const [physical, setPhysical] = useState(0);
  const [mental, setMental] = useState(0);
  const [spiritual, setSpiritual] = useState(0);
  const [emotionalData, setEmotionalData] = useState([]);
  const [physicalData, setPhysicalData] = useState([]);
  const [mentalData, setMentalData] = useState([]);
  const [spiritualData, setSpiritualData] = useState([]);
  const [heading, setHeading] = useState("Statistics");

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../assets/fonts/Aquire-BW0ox.otf')
  });

  // retrieve data
  const getData = async () => {
    try {
      const date = createDateStringFromToday();
      const jsonValue = await AsyncStorage.getItem(date);
      if (jsonValue != null) {
        var data = JSON.parse(jsonValue);
        updateData(data);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const getDataMonth = async () => {
    try {
      var today = new Date();
      let entryCounter = 0;
      let runningData = [0,0,0,0];
      let eData = [];
      let pData = [];
      let mData = [];
      let sData = [];
      for (let index = 0; index < 30; index++) {
        // try get Data
        const date = createDateStringFromDate(today);
        const jsonValue = await AsyncStorage.getItem(date);
        if (jsonValue != null) {
          var data = JSON.parse(jsonValue);
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
        // update date for next loop iteration
        today.setDate(today.getDate()-1);
      }

      setEmotional(Math.ceil(runningData[0]/entryCounter));
      setMental(Math.ceil(runningData[1]/entryCounter));
      setPhysical(Math.ceil(runningData[2]/entryCounter));
      setSpiritual(Math.ceil(runningData[3]/entryCounter));
      setEmotionalData(eData);
      setMentalData(mData);
      setPhysicalData(pData);
      setSpiritualData(sData);
      setHeading("Last 30 Days:");
      return true;
    } catch (e) {
      console.log(e);
      setEmotional(0);
      setMental(0);
      setPhysical(0);
      setSpiritual(0);

      return false;
    }
  };

  const getDataHalfYear = async () => {
    try {
      var today = new Date();
      let entryCounter = 0;
      let runningData = [0,0,0,0];
      let eData = [];
      let pData = [];
      let mData = [];
      let sData = [];
      for (let index = 0; index < 180; index++) {
        // try get Data
        const date = createDateStringFromDate(today);
        const jsonValue = await AsyncStorage.getItem(date);
        if (jsonValue != null) {
          var data = JSON.parse(jsonValue);
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
        // update date for next loop iteration
        today.setDate(today.getDate()-1);
      }

      setEmotional(Math.ceil(runningData[0]/entryCounter));
      setMental(Math.ceil(runningData[1]/entryCounter));
      setPhysical(Math.ceil(runningData[2]/entryCounter));
      setSpiritual(Math.ceil(runningData[3]/entryCounter));
      setEmotionalData(eData);
      setMentalData(mData);
      setPhysicalData(pData);
      setSpiritualData(sData);
      setHeading("Last 30 Days:");
      return true;
    } catch (e) {
      console.log(e);
      setEmotional(0);
      setMental(0);
      setPhysical(0);
      setSpiritual(0);

      return false;
    }
  };
  
  function updateData(result) {
    setEmotional(result.emotional);
    setMental(result.mental);
    setPhysical(result.physical);
    setSpiritual(result.spiritual); 
    setHeading("Today's values:");
  }
  
  function calculateStyle(value) {
    let customStyle;
    if (value < 30) {
      customStyle = StyleSheet.create({
        statisticsValueText: {
          backgroundColor: colorBurnout
        }
      })
    } else if (value < 70) {
      customStyle = StyleSheet.create({
        statisticsValueText: {
          backgroundColor: colorWatchit
        }
      })
    } else {
      customStyle = StyleSheet.create({
        statisticsValueText: {
          backgroundColor: colorHealthy
        }
      })
    }

    const combinedStyles = StyleSheet.flatten( [styles.statisticsValueText, customStyle.statisticsValueText]);

    return combinedStyles;
  }

  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFF',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForDots: {
      r: "1",
      strokeWidth: "1",
      stroke: "#000"
    }
  };

  return (
    <>
    <Stack.Screen options={{headerShown: false, title: 'Statistics'}}></Stack.Screen>
    <ScrollView>
      <View style={styles.statisticsContainer} onLayout={getData}>
        <View style={{height: 40}}></View>
        <Text style={styles.homeTabHeading}>{heading}</Text>
        <StatusBar style="auto"></StatusBar>
        <ProgressChart
          data={{
            labels: ["Emotional", "Physical", "Mental", "Spiritual"], // optional
            data: [ emotional/100, physical/100, mental/100, spiritual/100]
          }}
          width={350}
          height={220}
          strokeWidth={12}
          radius={16}
          chartConfig={chartConfig}
          hideLegend={false}
        />
        <View style={{width: 300, margin: 16}}>
          <View style={{flex: 1, flexDirection: 'row'}}> 
            <View style={{flex: 1}}>
              <Text style={styles.statisticsText}>Emotional: </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={calculateStyle(emotional)}>{emotional}</Text>
            </View>
          </View>
          <View>
            {emotionalData.length > 0 ? <LineChart
                data={{
                  datasets: [
                    {
                      data: emotionalData
                    }
                  ]
                }}
                width={300} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={7} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
            />
            : ""}
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}> 
            <View style={{flex: 1}}>
              <Text style={styles.statisticsText}>Physical: </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={calculateStyle(physical)}>{physical}</Text>
            </View>
          </View>
          <View>
            {physicalData.length > 0 ? <LineChart
                data={{
                  datasets: [
                    {
                      data: physicalData
                    }
                  ]
                }}
                width={300} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={7} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              /> : ""}
            </View>
          <View style={{flex: 1, flexDirection: 'row'}}> 
            <View style={{flex: 1}}>
              <Text style={styles.statisticsText}>Mental: </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={calculateStyle(mental)}>{mental}</Text>
            </View>
          </View>
          <View>
            {mentalData.length > 0 ? <LineChart
                data={{
                  datasets: [
                    {
                      data: mentalData
                    }
                  ]
                }}
                width={300} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={7} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              /> : ""}
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}> 
            <View style={{flex: 1}}>
              <Text style={styles.statisticsText}>Spiritual: </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={calculateStyle(spiritual)}>{spiritual}</Text>
            </View>
          </View>
          <View>
          {spiritualData.length > 0 ? <LineChart
              data={{
                datasets: [
                  {
                    data: spiritualData
                  }
                ]
              }}
              width={300} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={7} // optional, defaults to 1
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            /> : ""}
          </View>
        </View>
        
        <View style={{height: 20}}></View>
        <View style={styles.buttonRow}>
          <Pressable onPress={getData} style={styles.statisticsButton}>
            <Text style={styles.statisticsButtonText}>Today</Text>
          </Pressable>

          <Pressable onPress={getDataMonth} style={styles.statisticsButton}>
            <Text style={styles.statisticsButtonText}>30-Day</Text>
          </Pressable>
          <Pressable onPress={getDataHalfYear} style={styles.statisticsButton}>
            <Text style={styles.statisticsButtonText}>6-Months</Text>
          </Pressable>
        </View>
        <View style={{height: 20}}></View>
      </View>
    </ScrollView>
    </>
  );
}
