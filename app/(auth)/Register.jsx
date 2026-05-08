import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacers'
import { Colors } from '../../Constants/Colors'
import PressableBtn from '../../components/ThemedBtn'
import ThemedTextInput from '../../components/ThemedTextInput'
import { useUser } from '../../hooks/useUser'

// [replace] in the Link component below: means instead of add/push into navigation stack, 
// replace the current page

// TouchableWithoutFeedback:- a native component that wraps around the whole screen, 
// ***** Indicates touch event, if the user tap outside the TextInput, it closes (dismiss) 
// the Keypad*******

  const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { user, register } = useUser()

  const handleSubmit = async () => {
    try {
      setError(null)
      await register(name, email, password) // a Register Func call
      // await means pause the execution of JavaScript async Func, 
      // until get the response or reject
      console.log('current user value:', user) 
      // user = UserContext Provide user state value
    }
    catch(error) {
      setError(error.message)
    }
  }
  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <ThemedView style={styles.container}>

      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Create Your account
      </ThemedText>

      <ThemedTextInput 
      style = {{width: '80%', marginBottom: 20}}
      placeholder = 'Full Name'
      onChangeText = {setName}
      value = {name}
      />
      
      <ThemedTextInput 
      style = {{width: '80%', marginBottom: 20}}
      placeholder = 'Email'
      keyboardType = 'email-address'
      onChangeText = {setEmail}
      value = {email}
      />

      <ThemedTextInput 
      style = {{width: '80%', marginBottom: 20}}
      placeholder = 'password'
      onChangeText = {setPassword}
      value = {password}
      secureTextEntry
      />
      
      <PressableBtn onPress={handleSubmit} >
        <Text style ={{color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>Register</Text>
      </PressableBtn>  
      
      <Spacer />
      {error && <Text style = {styles.error}>{error}</Text>}
      
      <Spacer height={100}/>
      
      <Link href="/Login" style={{ textAlign: "center" }} replace>
        
        <ThemedText style={{ textAlign: "center"}}>
          Login Instead
        </ThemedText>

      </Link>

    </ThemedView>
  </TouchableWithoutFeedback>
  )
}

export default Register

const styles = StyleSheet.create({
 container: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: 'center',
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }
})