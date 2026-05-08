import { StatusBar, StyleSheet} from 'react-native'
import { Stack } from 'expo-router';
import React from 'react'
import { useUser } from '../../hooks/useUser';
import GuestOnly from '../../components/auth/GuestOnly';

export default function AuthLayout()  {

  return (
    <GuestOnly>
      <StatusBar style='auto' />
      <Stack screenOptions={{ headerShown: false, animation: 'none'}}
    />
    </GuestOnly>
  )
}

const styles = StyleSheet.create({})