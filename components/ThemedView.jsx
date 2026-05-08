import { StyleSheet, View, useColorScheme } from 'react-native'
import { Colors } from '../Constants/Colors'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// It's a Functional native component 2ThemesView" that can be nested to any screen page of the app
// ThemeView contains Destructive props 'one is style and other props means {children} 
// <text>, <onPress> etc
// In view component (where the Output screen started to display), contains array of styles,
// React Native excepts array of styling
// Always apply Background color, and other style properties passed to the component 
// Inside component, display the {children} tags 
// SafeAreaView component access the safe area of your device and keep all the content 
// inside it
// useSafeAreaInsets is a Hook that acessing space from edges to keep the content in safe zone
// and returns properties Like paddingTop, Left, etc

const ThemedView = ( { style, safe = false, ...props } ) => {
  
  // useColorScheme is react hook that returns value either 'dark' or 'light' color theme
  // Colors[colorScheme]:- means get property value from Colors object dynamically in React
  // Native
  // Use dark theme if device is dark, otherwise fallback to Light colorScheme

    const colorScheme = useColorScheme() 
    const theme = Colors[colorScheme] ?? Colors.light 
  
  if(!safe) 
    return (
    <View style = {[{backgroundColor: theme.background}, style]}
      {...props}>
    </View>
  )
  const insets = useSafeAreaInsets()
  return (
    <View style = {[{
      backgroundColor: theme.background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }, style]}
      {...props}>
    </View>  
  )
}

export default ThemedView

const styles = StyleSheet.create({})