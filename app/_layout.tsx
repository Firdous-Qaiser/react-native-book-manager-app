import { StatusBar, StyleSheet, useColorScheme } from 'react-native'
import { Stack } from 'expo-router';
import { Colors } from '../Constants/Colors';
import React from 'react'
import { UserProvider } from '../contexts/UserContext';
import { BooksProvider } from '../contexts/BooksContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
    const colorScheme = useColorScheme() // Either returns 'Light' or 'Dark'
    const theme = Colors[colorScheme] ?? Colors.light 
  return (
        <UserProvider>
        <BooksProvider>
          <GestureHandlerRootView>
            <StatusBar barStyle='default' />
            <Stack 
            screenOptions={{
            headerStyle: {backgroundColor: theme.navBackground},
            headerTintColor: theme.title,
            }}>
            <Stack.Screen name='index' />                    
            <Stack.Screen name='(auth)' options={{ headerShown: false }} />
            <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
            
           </Stack>
           </GestureHandlerRootView>
        </BooksProvider>
    </UserProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})

