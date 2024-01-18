import { Stack } from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../../../styles.js';
import { useFonts } from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import ListItem from '../../../../components/ListItem.jsx';
import { createReminderNotification, scheduleNotification } from '../../../../utility/notifications.js';

export default function NotificationSettingsPage() {
  const notificationSettingString = "notificationSetting";
  const notificationTimeString = "notificationTimeSetting";

  const [fontsLoaded] = useFonts({
    'Questrial': require('../../../../assets/fonts/questrial.ttf'),
    'Aquire': require('../../../../assets/fonts/Aquire-BW0ox.otf')
  });

  const [heading, setHeading] = useState("Notification Settings");
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState(null);

  const toggleSwitchNotification = () => {
    try {
      // toggle
      setNotificationEnabled(prev => {
        const jsonValue = JSON.stringify(!prev);
        AsyncStorage.setItem(notificationSettingString, jsonValue);
        return !prev
      })
    } catch (e) {
      console.error(e);
    }
  }

  const saveTime = async (event, newDate) => {
    setTimePickerVisible(false)
    if (event.type === 'set') {
      try {
        const d = new Date(event.nativeEvent.timestamp);
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
        setDate(() => {
          const stringDate = d.toString();
          AsyncStorage.setItem(notificationTimeString, stringDate);
          return d;
        })
      } catch (e) {
        console.error(e);
      }
    }
  }

  const openTimePicker = () => {
    setTimePickerVisible(true);
  }

  const loadSettings = async () => {
    try {
      const isEnabled = await AsyncStorage.getItem(notificationSettingString)
      const dateSetting = await AsyncStorage.getItem(notificationTimeString)

      if (isEnabled !== null) {
        setNotificationEnabled(JSON.parse(isEnabled))
      }

      if (dateSetting !== null) {
        setDate(new Date(dateSetting))
      } else {
        setDate(new Date())
      }
    } catch (e) {
      console.error()
    }
  }

  return (
    <>
    <Stack.Screen options={{headerShown: false, title: 'Settings'}}></Stack.Screen>
    <ScrollView style={styles.scrollViewContainer} onLayout={loadSettings}> 
        <View style={{height: 40}}></View>
        <Text style={styles.homeTabHeading}>{heading}</Text>
        <StatusBar style="auto"></StatusBar>

        <ListItem label="Daily Notification" onPress={toggleSwitchNotification}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={notificationEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchNotification}
            value={notificationEnabled}
          />
        </ListItem>

        {notificationEnabled ?
          <ListItem label="Notification Time" onPress={openTimePicker}>
            {date ? 
              <Text style={{color: "white"}}>
                {`${date.toLocaleTimeString()}`}
              </Text>
            : null}
          </ListItem>
        : null}

        {timePickerVisible ? 
          <View>
            <DateTimePicker value={date} mode="time" onChange={saveTime} />
          </View>
        : null}
    </ScrollView>
    </>
  )
}