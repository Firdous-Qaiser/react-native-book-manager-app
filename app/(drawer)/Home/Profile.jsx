import { StyleSheet, useColorScheme } from 'react-native'
import { useUser } from '@/hooks/useUser'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Colors } from '@/Constants/Colors'
import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import Spacers from '@/components/Spacers'
import ThemedBtn from '@/components/ThemedBtn'

const Profile = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const { user } = useUser()
    
    return (
    <ThemedView style = {styles.container}>
        <Ionicons name="person-outline" size={30} color={theme.iconColor} borderColor= {theme.iconColor} style={styles.icon} />
        <ThemedText style = {styles.title} title={true}>
            Hello! {user.name}
        </ThemedText>
        <ThemedText style = {styles.title} title={false}>
            {user.email}
        </ThemedText>
        
        <Spacers height={20}/>
        
        <ThemedText>
            Time to start reading some Book..
        </ThemedText>

        <Spacers height={20}/>

    </ThemedView>
  )
}

export default Profile

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
    icon: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        marginBottom: 20,
    }
})