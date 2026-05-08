import { StyleSheet, Text, Pressable } from 'react-native'
import { Colors } from '../Constants/Colors'
import React from 'react'

// ThemedBtn component expects the style prop, and ...prop collects the remaining props
const ThemedBtn = ( {style, ...props} ) => {
  return (
     <Pressable style = {({pressed}) => [styles.btn, pressed && styles.pressed, style]}
     {...props} />     
  )
}

export default ThemedBtn

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  }
})