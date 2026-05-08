import React, { useState } from 'react';
import {StyleSheet, Button, useColorScheme} from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Colors } from '@/Constants/Colors';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import ThemedBtn from '@/components/ThemedBtn';
import { Ionicons } from '@expo/vector-icons'
import UserOnly from '@/components/auth/UserOnly';
import CustomHeaderTitle from '@/components/customHeaderTitle';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function HomeLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const router = useRouter();
  const [showTabs, setShowTabs] = useState(false); // show tabs after user navigates

  if (!showTabs) {
    // Show Welcome screen first
    return (
        <ThemedView style={styles.welcomeContainer}>
          <ThemedText style={styles.welcomeText}>Welcome to Home!</ThemedText>
          <ThemedBtn onPress={() => setShowTabs(true)} >
            <ThemedText style={styles.btn}>GET STARTED</ThemedText>
          </ThemedBtn>
        </ThemedView>
    );
  }

  // Show Tabs only after user clicks Enter
  return (
  <UserOnly>
        <Tabs 
        screenOptions={{
        headerShown: true, 
        headerStyle: {backgroundColor: theme.navBackground},
        headerTintColor: theme.title,
        headerTitleAlign: 'center',
        
        headerLeft: ({ tintColor }) => 
        <DrawerToggleButton tintColor={theme.iconColor} 
        />,
        
      tabBarStyle: 
        {
        backgroundColor: theme.navBackground,
        paddingTop: 10,
        height: 70
      },
    tabBarActiveTintColor: theme.iconColorFocused,
    tabBarInactiveTintColor: theme.iconColor
    }}>
        <Tabs.Screen name='Profile' options={{headerTitle: () => 
          <CustomHeaderTitle title = 'Profile'/>,
          tabBarIcon: ({focused}) => (
          <Ionicons 
            size={24}
            name={focused ? 'person' : 'person-outline'}
            color={focused ? theme.iconColorFocused : theme.iconColor}
          />
        )}}  
        />  
        <Tabs.Screen name='create' options={{headerTitle: () => 
          <CustomHeaderTitle title = 'Create'/>,
          tabBarIcon: ({focused}) => (
          <Ionicons 
            size={24}
            name={focused ? 'create' : 'create-outline'}
            color={focused ? theme.iconColorFocused : theme.iconColor}
          />
        )}}  
        /> 
        <Tabs.Screen name='book' options={{headerTitle: () => 
          <CustomHeaderTitle title = 'Books'/>,
          tabBarIcon: ({focused}) => (
          <Ionicons 
            size={24}
            name={focused ? 'book' : 'book-outline'}
            color={focused ? theme.iconColorFocused : theme.iconColor}
          />
        )}}  
        /> 
        <Tabs.Screen 
        name='books/[id]'
        options={{href: null}}/> 
    </Tabs>
  </UserOnly>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  btn: {
    color: '#f2f2f2',
    fontWeight: 600,
  }
});