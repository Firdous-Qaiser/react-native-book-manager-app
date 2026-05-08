import { StyleSheet } from 'react-native'
import { useUser } from '@/hooks/useUser'
import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import ThemedBtn from '@/components/ThemedBtn'
import Spacers from '@/components/Spacers'
import React from 'react'

const Signout = () => {
  const { logout } = useUser()
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Signing off from the App</ThemedText>
      <Spacers height={20} />
      <ThemedBtn onPress = {logout}>
            <ThemedText style={styles.btnText}>Logout</ThemedText>
      </ThemedBtn>
    </ThemedView>
  )
}

export default Signout

const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnText: {
      color: '#f2f2f2',
      fontWeight: 600
    }
})