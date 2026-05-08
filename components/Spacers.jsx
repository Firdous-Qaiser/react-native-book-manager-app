// A custom component for margins and Padding
import { StyleSheet, View } from 'react-native'
import React from 'react'

// View components rendered the prop childrens ( H, W)
const Spacers = ({width = '100%', height = 40}) => {
  return (
    <View style = {{width, height}} />
  )
}

export default Spacers

const styles = StyleSheet.create({})