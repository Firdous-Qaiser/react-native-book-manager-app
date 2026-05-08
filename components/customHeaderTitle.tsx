import React from "react"
import { StyleSheet, Text, useColorScheme } from "react-native"
import { Colors } from "@/Constants/Colors";

// Typescript structure:-
// type: Let you define the shape of your Props that your components withh accept,
// its says that Props (object) have a property named 'title' must contain a string value

type Props = {
    title: string;
};

export default function CustomHeaderTitle({title} : Props) {
        const colorScheme = useColorScheme() ?? 'light' // Either returns 'Light' or 'Dark'
        const theme = Colors[colorScheme] ?? Colors.light 
    
        return <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text}}>{title}</Text>
}