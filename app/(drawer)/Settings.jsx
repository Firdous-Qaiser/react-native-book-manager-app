import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Colors } from '@/Constants/Colors';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import ThemedBtn from '@/components/ThemedBtn';

export default function SettingsScreen() {
  // Switch toggles 
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const theme = Colors[darkModeEnabled ? 'dark' : 'light'];
  
  // Notifications:- is a object or a module that contains 
  // many Func and Features
  // Request permission for notifications 
  // This Func tells how the notifications Looks on a screen ) 
  // Run at once when the screen loads 
 useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);
   
// Ask permission (For local notification)
   const showAlert = (message) => {
    setAlertMessage(message);

    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };
  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      showAlert('❌ Notifications blocked');
      return false;
    }

    showAlert('✅ Notifications enabled');
    return true;
  };
  // Send local notification (Create Notification)
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Notifications Enabled ✅',
        body: 'You will now receive app alerts.',
      },
      trigger: null, // immediate
    });
  };

  // Toggle notifications (ON/OFF)
  const handleNotificationToggle = async (value) => {
    setNotificationsEnabled(value);

    if (value) {
      const granted = await requestPermission();
      if (granted) {
        await sendNotification();
      } else {
        setNotificationsEnabled(false);
      }
    }
  };
  // Reset button handler
  const handleResetSettings = () => {
    Alert.alert('Reset', 'Settings have been reset to default!');
    setNotificationsEnabled(false);
    setDarkModeEnabled(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {alertMessage && (
        <View style={styles.alertBox}>
          <ThemedText style={styles.alertText}>
            {alertMessage}
          </ThemedText>
        </View>
      )}
      <ThemedView style={styles.option}>
        <ThemedText style={[styles.optionText, { color: theme.title }]}>
          Enable Notifications
        </ThemedText>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationToggle}
          thumbColor={notificationsEnabled ? theme.iconColorFocused : '#ccc'}
          trackColor={{ false: '#777', true: theme.iconColor }}
        />
      </ThemedView>

      {/* Dark Mode Toggle */}
      <ThemedView style={styles.option}>
        <ThemedText style={[styles.optionText, { color: theme.title }]}>
          Dark Mode
        </ThemedText>
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          thumbColor={darkModeEnabled ? theme.iconColorFocused : '#ccc'}
          trackColor={{ false: '#777', true: theme.iconColor }}
        />
      </ThemedView>

      {/* Reset Button */}
      <ThemedBtn onPress={handleResetSettings} style={styles.btn}>
        <ThemedText style={{ color: '#f2f2f2', fontWeight: 600 }}>
          Reset Settings
        </ThemedText>
      </ThemedBtn>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  optionText: { fontSize: 16 },
  btn: { 
    alignSelf: 'center', 
    marginTop: 20, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 8 },
});