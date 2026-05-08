import { useColorScheme, StyleSheet, Dimensions } from 'react-native'
import { Colors } from '@/Constants/Colors';
import { Drawer } from 'expo-router/drawer';
import CustomHeaderTitle from '../../components/customHeaderTitle';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function DrawerLayout() {
    const colorScheme = useColorScheme() // Either returns 'Light' or 'Dark'
    const theme = Colors[colorScheme] ?? Colors.light 

    const screenHeight = Dimensions.get('window').height;

  return (
    <Drawer initialRouteName="Home" 
    screenOptions={{ 
          headerStyle: {backgroundColor: theme.navBackground},
          headerTintColor: theme.title,
          headerTitleAlign: 'center' ,
          drawerStyle: {
            backgroundColor: theme.navBackground } ,
            drawerActiveTintColor: theme.text,            
            drawerInactiveTintColor: theme.text, 
      }}>
      <Drawer.Screen
        name="Home"
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);

          // Show Drawer header only if WelcomeDummy is active
          const showHeader = routeName !== undefined

          return {
            headerShown: !showHeader,
            headerTitle: () => <CustomHeaderTitle title="Home" />,
            drawerIcon: ({focused}) => (
            <Ionicons 
            size={18}
            name={focused ? 'home' : 'home-outline'}
            color={focused ? theme.iconColorFocused : theme.iconColor}
            />),
          }
        }}
        />
      <Drawer.Screen
        name="Settings"
        options={{ headerTitle: () => <CustomHeaderTitle title="Settings" />,
        drawerIcon: ({focused}) => (
            <Ionicons 
            size={18}
            name={focused ? 'settings' : 'settings-outline'}
            color={focused ? theme.iconColorFocused : theme.iconColor}
            />),
          }}
      />
      <Drawer.Screen
        name="Share"
        options={{ headerTitle: () => <CustomHeaderTitle title="Share" /> ,
        drawerIcon: ({focused}) => (
            <Ionicons 
            size={18}
            name={focused ? 'share-social' : 'share-social-outline'}
            color={focused ? theme.iconColorFocused : theme.iconColor}
            />),
          }}
      />
      <Drawer.Screen
        name="Signout"
        options={{ headerTitle: () => <CustomHeaderTitle title="Sign out" /> ,
        drawerIcon: ({focused}) => (
            <Ionicons 
            size={18}
            name={focused ? 'log-out' : 'log-out-outline'}
            color={focused ? theme.iconColorFocused : theme.iconColor}
            />),
            drawerItemStyle: {
            marginTop: screenHeight * 0.65, 
          },
          }}
      />
    </Drawer>
  );
}
const styles = StyleSheet.create({

})