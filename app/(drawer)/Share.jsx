import React from 'react';
import { View, Text, StyleSheet, Button, useColorScheme, Share } from 'react-native';
import { Colors } from '@/Constants/Colors';
import ThemedView from '@/components/ThemedView';
import ThemedBtn from '@/components/ThemedBtn';
import ThemedText from '@/components/ThemedText';

export default function ShareScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const handleShare = async () => {
    // try catch Block {} for catches the error
    // Share.share'll open the react-native share sheet
    // async Func wait for the action to complete before continuing
    try {
      await Share.share({
        message: 'Check out the app I am using!', 
        title: 'My App',
      });
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ThemedText title={true} style={[styles.title, { color: theme.title }]}>Tell yout Friends about this app</ThemedText>
      <ThemedBtn onPress={handleShare}>
        <ThemedText style = {{color: '#f2f2f2', fontWeight: 600 }}>SHARE</ThemedText>
      </ThemedBtn>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
  },
});