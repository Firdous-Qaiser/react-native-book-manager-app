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
import ThemedLoader from '../../components/ThemedLoader'

// keyboardType: a TextInput property that controls what keyboard Layout pops up when user Focused on 
// Input Field.
// secureTextEntry:- Password-style input, hide typed text for security.

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To display the error better  

  const {user, login} = useUser() // use custom hook

  const handleSubmit = async () => {
    setError(null)
    try {
      await login(email, password) // a login Func call
      // await means pause the execution of JavaScript async Func, 
      // until get the response or reject
      console.log('current user value:', user) 
      // user = UserContext Provide user state value
    }
    catch(error) {
      setEmail(error.message)
    }
  }
  return (
  
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style={styles.container}>

      <Spacer />     
      <ThemedText title={true} style={styles.title}>
        Login to Your Account
      </ThemedText>
      
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
      <Text style ={{color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>Login</Text>
    </PressableBtn>     
      
    <Spacer />
    
    {error && <Text style = {styles.error}>{error}</Text>}
    
    <Spacer height={100}/>

    <Link href="/Register" style={{ textAlign: "center" }} replace >
      <ThemedText>
          Register Instead
      </ThemedText>
 
    </Link>   
  
  </ThemedView>  
</TouchableWithoutFeedback>
  )
}
export default Login

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
