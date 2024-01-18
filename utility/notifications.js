import notifee, { TriggerType, RepeatFrequency } from "@notifee/react-native"

export function createReminderNotification() {
  return {
    title: "reminder",
    body: "reminder",
    android: {
      channelId: 'reminder',
    },
    ios: {
      sound: 'default',
      categoryId: 'reminder'
    },
  }
}

export async function scheduleNotification(notification, timestamp) {
  const trigger = {
    type: TriggerType.TIMESTAMP,
    repeatFrequency: RepeatFrequency.DAILY,
    timestamp: timestamp
  }
  await notifee.createTriggerNotification(notification, trigger)
}