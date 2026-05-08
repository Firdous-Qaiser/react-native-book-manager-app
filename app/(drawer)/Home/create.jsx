import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { useRouter } from 'expo-router'
import { useBook } from '@/hooks/useBook'
import React, { useState } from 'react'
import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import ThemedTextInput from "@/components/ThemedTextInput"
import ThemedBtn from '@/components/ThemedBtn'
import Spacers from '@/components/Spacers'


const Create = () => {
   const [title, setTitle] = useState("")
   const [author, setAuthor] = useState("")
   const [description, setDescription] = useState("")
   const [loading, setLoading] = useState(false)

   const { createBook } = useBook()
   const router = useRouter()

   const handleSubmit = async () => {  
    // trim() remove the space from start and end, ! operator check if its empty or not 
    // if condition is true, then don't do anything the Func returns, without create and 
    // save the Book
    if (!title.trim() || !author.trim() || !description.trim()) return
    setLoading(true)

    // create an instance of Book in the database
    // createBook() Func expects data object, & 
    // object stores data in key-valur pairs {}
    await createBook ( {title, author, description} )

    // Reset fields
    setTitle('')
    setAuthor('')
    setDescription('')

    //Redirect
    router.replace('/Home/book')
    
    //Reset Loading 
    setLoading(false)
}
  
   return (
    
    <TouchableWithoutFeedback>
        
        <ThemedView style = {styles.container}>
          
          <ThemedText style = {styles.title} title={true}>
              Add a new Book
          </ThemedText>         
          <Spacers />

          <ThemedTextInput
          style={styles.input}
          placeholder= 'Book title'
          value= {title}
          onChangeText= {setTitle}
          />
          <Spacers />

          <ThemedTextInput
          style={styles.input}
          placeholder= 'Author'
          value= {author}
          onChangeText= {setAuthor}
          />
          <Spacers />

          <ThemedTextInput
          style={styles.multiline}
          placeholder= 'Book Description'
          value= {description}
          onChangeText= {setDescription}
          multiline= {true}
          />
          <Spacers />
          
          <ThemedBtn onPress={handleSubmit} disabled={loading}> 
            <Text style={{ color: '#fff' }}>
                {loading ? "Saving..." : "create Book"}
           </Text>
          </ThemedBtn>

       </ThemedView>

    </TouchableWithoutFeedback>
  )
}

export default Create

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    input: 
    {
    padding: 20,
    borderRadius: 6,
    // The Following property tells element to expand and takes all available width,
    // Fill container cross-axis space, stretches to full width
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
})