// /app/(tabs)/settings/index.js

import { Stack, useRouter } from 'expo-router';
import {StatusBar} from 'expo-status-bar'
import { useState, useEffect } from 'react';
import { View, Text, Pressable, Switch  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../../styles.js';
import { createDateStringFromDate, getRandomInt } from '../../../utility/utility.js';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from '../../../components/ListItem.jsx';

export default function Page() {
  const notificationSettingString = "notificationSetting";

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../assets/fonts/Aquire-BW0ox.otf')
  });

  const router = useRouter();
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

  const goToNotifications = () => {
    router.push('(tabs)/settings/notifications')
  }

  // retrieve settings 
  const getSettings = async () => {
    try {
      // load data
      const jsonValue = await AsyncStorage.getItem(notificationSettingString);
      if (jsonValue != null) {
        var data = JSON.parse(jsonValue);
        if (data != null) {
          // update setting
          setNotificationEnabled(data);
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

  const deleteData = () => {
    AsyncStorage.clear();
  }

  const generateData = async () => {
    try {
      var today = new Date();
      for (let index = 0; index < 10; index++) {
        // try get Data
        const date = createDateStringFromDate(today);
        let value = {emotional: getRandomInt(100), physical: getRandomInt(100), spiritual: getRandomInt(100), mental: getRandomInt(100)};
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(date, jsonValue);
        // update date for next loop iteration
        today.setDate(today.getDate() - 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSettings();
 }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'Settings' }}></Stack.Screen>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={{ height: 40 }}></View>
        <Text style={styles.homeTabHeading}>{heading}</Text>
        <StatusBar style="auto"></StatusBar>

        <ListItem label="Notifications" onPress={goToNotifications} />


        <View style={styles.settingsItem}>
          <View style={{ flex: 2, justifyContent: 'left' }}>
            <Text style={styles.settingsListItem}>Advanced Settings</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
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
        
          <Pressable onPress={generateData} 
            style={({ pressed }) => [
              styles.statisticsButton,
              { 
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
              },
            ]}
          >
            <Text style={styles.statisticsButtonText}>Generate Data</Text>
          </Pressable>
          <View style={{height: 40}}></View>
          
          <Pressable onPress={deleteData} 
            style={({ pressed }) => [
              styles.statisticsButton,
              { 
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
              },
            ]}
          >
            <Text style={styles.statisticsButtonText}>Delete All Data</Text>
          </Pressable>
          <View style={{height: 40}}></View>

            <Pressable onPress={() => { }} style={styles.statisticsButton}>
              <Text style={styles.statisticsButtonText}>Export Data</Text>
            </Pressable>
            <Pressable onPress={() => { }} style={styles.statisticsButton}>
              <Text style={styles.statisticsButtonText}>Import Data</Text>
            </Pressable>
            <View style={{ height: 40 }}></View>

            <View>
              <Text style={styles.licenseText}>Icons from Freepik und UIcons</Text>
            </View>
          </View>
          : null}
      </ScrollView>
    </>
  );
}
