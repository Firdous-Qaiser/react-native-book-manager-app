import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

// we're creating a custom hook useUser() to make it clean, reusable, and safe when accessing context 
// in react, Instead of directly use UserContext.
// useContext: a react hook that let components read data from Context
// Throws an error if forget to wrap the app with Provider. 

export function useUser() {
const context = useContext(UserContext)
//context:- contains all the value of the object 

if(!context) {
    throw new Error('useUser must be used within a UserProvider');   
}
    return context
}