// /app/(tabs)/settings/index.js

import { Stack } from 'expo-router';
import {StatusBar} from 'expo-status-bar'
import { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Switch, StyleSheet  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, colorBurnout, colorHealthy, colorWatchit } from '../../../styles.js';
import { createDateStringFromToday, createDateStringFromDate, getRandomInt } from '../../../utility/utility.js';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';

export default function Page() {

  const notificationSettingString = "notificationSetting";

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../assets/fonts/Aquire-BW0ox.otf')
  });

  const [heading, setHeading] = useState("Settings");
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [advancedEnabled, setAdvancedEnabled] = useState(false);

  const toggleSwitchNotification = async () => {
    try {
      // toggle
      setNotificationEnabled(previousState => !previousState);
      // store
      const jsonValue = JSON.stringify(notificationEnabled);
      await AsyncStorage.setItem(notificationSettingString, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleSwitchAdvanced = () => {
    // toggle
    setAdvancedEnabled(previousState => !previousState);
  };

  // retrieve settings 
  const getSettings = async () => {
    try {
      // load data
      const jsonValue = await AsyncStorage.getItem(notificationSettingString);
      if (jsonValue != null) {
        var data = JSON.parse(jsonValue);
        if( data != null) {
          // update setting
          notificationEnabled = data;
        }
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

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
    <ScrollView style={styles.scrollViewContainer}> 
        <View style={{height: 40}}></View>
        <Text style={styles.homeTabHeading}>{heading}</Text>
        <StatusBar style="auto"></StatusBar>

        <View style={styles.settingsItem}>
            <View style={{flex: 2, justifyContent: 'left'}}>
                <Text style={styles.settingsListItem}>Daily Notification</Text> 
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={notificationEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchNotification}
                value={notificationEnabled}
              />
            </View>                
        </View>

        <View style={styles.settingsItem}>
            <View style={{flex: 2, justifyContent: 'left'}}>
                <Text style={styles.settingsListItem}>Advanced Settings</Text> 
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={advancedEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchAdvanced}
                value={advancedEnabled}
              />
            </View>                
        </View>

        { advancedEnabled ? 
        <View >
          <View style={{height: 40}}></View>
          <Text style={styles.homeTabHeading}>Advanced Settings</Text>
          <Pressable onPress={generateData} style={styles.statisticsButton}>
            <Text style={styles.statisticsButtonText}>Generate Random Data</Text>
          </Pressable>
          <View style={{height: 40}}></View>

          <Pressable onPress={() => {}} style={styles.statisticsButton}>
            <Text style={styles.statisticsButtonText}>Export Data</Text>
          </Pressable>
          <Pressable onPress={() => {}} style={styles.statisticsButton}>
            <Text style={styles.statisticsButtonText}>Import Data</Text>
          </Pressable>
          <View style={{height: 40}}></View>

          <View>
            <Text style={styles.licenseText}>Icons from Freepik und UIcons</Text>
          </View>
        </View>
        : null }
    </ScrollView>
    </>
  );
}
