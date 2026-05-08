import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { account } from "../lib/appwrite";
import { ID } from 'react-native-appwrite';
import { router } from "expo-router";

// Creating Global User authentication context in React Native, it let components in your app access 
// the user Loggedin and authentication functions without passing props 

// A very common Global authentication + custom hook in Large native app

// createContext() a react Func used to create UserContext object, object is used to share data 
// across components without using props, works Like global data storage

// UserProvider is a native component will wrap around your app.

// 'user' a state variable stores the Loggedin User, state updater 'setUser' will update the user.

// UserContext.Provider makes the data available to entire app, any component can access the user 
// data

export const UserContext  = createContext()

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [authchecked, setAuthchecked] = useState(false)

    async function login(email, password) {
        //Request to create EmailPasswordSession to server
        //Request to get response object from the server
        
        try {
            await account.createEmailPasswordSession(email, password)
            const response = await account.get()
            setUser(response)
        } 
        catch(error) {
            throw Error(error.message)
        }        
    }
    async function register(name, email, password) {
        // create the user account and let Log them in 
        try {
            await account.create(ID.unique(), email, password, name)
            await login(email, password);
        }
        catch(error) {
        // Throw an error if password is not Long/storng error
            throw Error(error.message)
        }
    }
    async function logout() {
        // Removes the user active Login session from the backend.
        // User authentication token becomes invalid
        // Server will not regonize the user as Logged in 
        // alert with the typical CANCEL and OK btn
        // contains an array of object with Following properties 
    Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Logout cancelled"),
        style: "cancel" // makes the button look like a cancel button
      },
      
      {
        text: "OK",
        onPress: async () => {
          try {
            // Your logout logic
            await account.deleteSession('current');
            setUser(null);
            console.log("Logged out successfully");
          } catch (error) {
            console.log("Logout failed:", error);
          }
        }
      }
    ],
    { cancelable: true } // allows dismiss by tapping outside the alert
  );
}
    // This Func used to check if the user Logged in, when the components Loads
    async function getInitialUserValue() {
        try {
        // Request to get the data of currently Logged in user
        const res = await account.get()
        setUser(res)
        } 
        catch(error) {
            setUser(null)
        }
        // This blocks runs regardless the request succeeded or Failed
        finally {
            // app concerns about the checked Finished or not   
            // False: measn still checking auth, True: auth checked Funish        
            setAuthchecked(true)
        }
    }
    useEffect(() => {
        getInitialUserValue() // Invoke only once, when the components loads
    },[])
    
    return (
        <UserContext.Provider value = {{user, login, register, logout, authchecked}}>
            {children}       
        </UserContext.Provider>
    );

}