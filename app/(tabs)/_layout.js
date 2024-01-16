// /app/(tabs)/_layout.js

import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { styles, mainColor_red, mainColor_blue } from '../../styles.js';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        borderTopColor: '#000',
        backgroundColor: mainColor_blue,
      }
      }}>
      <Tabs.Screen
        name="home"
        color='white'
        options={{
          tabBarLabel: "Home",
          title: "Home",
          color: '#fff',
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              style={{ marginBottom: -3 }}
              name="home"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarLabel: "Statistics",
          title: "Statistics",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              style={{ marginBottom: -3 }}
              name="bar-chart"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              style={{ marginBottom: -3 }}
              name="gear"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}