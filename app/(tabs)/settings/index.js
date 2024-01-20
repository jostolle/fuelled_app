// /app/(tabs)/settings/index.js

import { Stack, useRouter } from 'expo-router';
import {StatusBar} from 'expo-status-bar'
import { useState, useEffect } from 'react';
import { View, Text, Pressable, Switch, Platform  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';
import { mainFont1, mainFontColor, styles } from '../../../styles.js';
import { createDateStringFromDate, getRandomInt } from '../../../utility/utility.js';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from '../../../components/ListItem.jsx';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createReminderNotification, scheduleNotification } from '../../../utility/notifications.js';

export default function Page() {
  const notificationSettingString = "notificationSetting";
  const notificationTimeString = "notificationTimeSetting";

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../assets/fonts/Aquire-BW0ox.otf')
  });

  const router = useRouter();
  const [heading, setHeading] = useState("Settings");
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [dateMinute, setDateMinute] = useState(0);
  const [dateHour, setDateHour] = useState(0);
  const [dateUpdate, setDateUpdate] = useState(null);
  const [advancedEnabled, setAdvancedEnabled] = useState(false);
  const [showPickerButtons, setShowPickerButtons] = useState(false);

  const DEBUG = false;

  const toggleSwitchNotification = async () => {
    try {
      // toggle
      let newNotificationSetting = !notificationEnabled;
      setNotificationEnabled(newNotificationSetting);
      // store
      const jsonValue = JSON.stringify(newNotificationSetting);
      await AsyncStorage.setItem(notificationSettingString, jsonValue);

      // delete notification...
      if (!newNotificationSetting) {
        await notifee.deleteChannel('reminder')
      } else {
        // create notification with current time
        await saveTime();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateTime = async (event, date) => {
    if (event.type === 'set') {
      const newDate = new Date(event.nativeEvent.timestamp);      
      setDateUpdate(newDate);

      if (Platform.OS === "android") {
        saveTime(newDate);
      }
    }
  }

  const cancelSaveTime = () => {
    setTimePickerVisible(false);
  }

  const saveTime = async (optionalDate) => {
    setTimePickerVisible(false)
    try {
      // initialize for now
      const currentDate = new Date();
      let d = new Date();
      
      // reset Seconds 
      d.setSeconds(0);
      if (dateUpdate != null) {
        // if dateUpdate is set, i.e. picker was used
        d.setMinutes(dateUpdate.getMinutes());
        d.setHours(dateUpdate.getHours());
      }
      if (optionalDate != null && !(optionalDate === undefined)) {
        // if dateUpdate is set, i.e. date was sent manually
        // i.e. e.g. that the android picker was used...
        d.setMinutes(optionalDate.getMinutes());
        d.setHours(optionalDate.getHours());
      }
      
      // check if it's in the 
      if (d < currentDate) {
        d.setDate(d.getDate() + 1);
      }


      await notifee.deleteChannel('reminder')
      await notifee.createChannel({
        id: 'reminder',
        name: 'reminder notifications'
      })
      const noti = createReminderNotification();
      await notifee.cancelTriggerNotifications();
      await notifee.setNotificationCategories([{
        id: 'reminder'
      }])
      await scheduleNotification(noti, d.getTime())
      const hours = d.getHours() > 9 ? d.getHours() : "0"+d.getHours();
      const minutes = d.getMinutes() > 9 ? d.getMinutes() : "0"+d.getMinutes();
      let stringDate = ""+hours + minutes;
      await AsyncStorage.setItem(notificationTimeString, stringDate);
      await AsyncStorage.setItem(notificationSettingString, JSON.stringify(true));
      setDateHour(hours);
      setDateMinute(minutes);
    } catch (e) {
      console.error(e);
    }
  }

  const openTimePicker = () => {
    // set current date time 
    setDateUpdate(new Date());
    setTimePickerVisible(true);
  }

  const toggleSwitchAdvanced = () => {
    // toggle
    setAdvancedEnabled(previousState => !previousState);
  };

  // retrieve settings 
  const getSettings = async () => {
    try {
      // load data
      const isEnabled = await AsyncStorage.getItem(notificationSettingString)
      const dateSetting = await AsyncStorage.getItem(notificationTimeString)

      if (isEnabled !== null) {
        setNotificationEnabled(JSON.parse(isEnabled))
      }

      if (dateSetting !== null) {
        const hour = parseInt(dateSetting.substring(0,2));
        const minute = parseInt(dateSetting.substring(2,4));
        setDateHour( hour > 9 ? hour : "0" + hour );
        setDateMinute( minute > 9 ? minute : "0" + minute );
        let newUpdateDate = new Date();
        newUpdateDate.setMinutes(minute);
        newUpdateDate.setHours(hour);
        setDateUpdate(newUpdateDate);
      } else {
        const d = new Date();
        setDateHour(d.getHours());
        setDateMinute(d.getMinutes());
        setDateUpdate(d);
      }

      if (Platform.OS === "ios") {
        setShowPickerButtons(true);
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
      today.setDate(today.getDate() - 2);
      for (let index = 0; index < 3; index++) {
        // try get Data
        const date = createDateStringFromDate(today);
        let value = {emotional: getRandomInt(100), physical: getRandomInt(100), spiritual: getRandomInt(100), mental: getRandomInt(100)};
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(date, jsonValue);
        // update date for next loop iteration
        today.setDate(today.getDate() + 1);
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

        <ListItem label="Daily Notification">
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={notificationEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchNotification}
            value={notificationEnabled}
          />
        </ListItem>

        {notificationEnabled ?
          <View style={{marginLeft: 16}}>
            <ListItem label="Notification Time" onPress={openTimePicker}>
                <Text style={styles.regularText}>
                  {`${dateHour}:${dateMinute}`}
                </Text>
            </ListItem>
          </View>
        : null}

        {timePickerVisible ? 
          <>
          <View flexDirection="row" justifyContent="center" style={{marginLeft: 16, marginBottom: 16}}>
            <DateTimePicker value={dateUpdate} mode="time" onChange={updateTime} />
          </View>
          { showPickerButtons ? 
          <View flexDirection="row" justifyContent="center" style={{alignItems: 'flex-end', alignContent: 'flex-end'}}>
            <Pressable onPress={cancelSaveTime} style={styles.statisticsButton}>
              <Text style={styles.statisticsButtonText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={() => saveTime(null)} style={styles.statisticsButton}>
              <Text style={styles.statisticsButtonText}>Save</Text>
            </Pressable>
          </View> : null }
          </>
        : null}

        { DEBUG ? 
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
          : null }
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
          </View>
          : null}
          <View style={{height: 40}}></View>
          <View>
            <Text style={styles.licenseText}>Icons from Freepik und UIcons</Text>
            <Text style={styles.licenseText}>Special thanks to Alex (@vacarsu)</Text>
          </View>
      </ScrollView>
    </>
  );
}
