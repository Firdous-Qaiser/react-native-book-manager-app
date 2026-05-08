import { FlatList, Pressable, StyleSheet } from 'react-native'
import { useBook } from '@/hooks/useBook'
import { useRouter } from 'expo-router'
import ThemedView from '@/components/ThemedView'
import ThemedText from '@/components/ThemedText'
import ThemedCard from '@/components/ThemedCard'
import Spacers from '@/components/Spacers'
import { Colors } from '@/Constants/Colors'

//FlatList is a native component used to render scrollable List of data efficiently,
//data={books}:- tells the List what data to display, expect to be an array of obj 
//keyExractor:- To track an individual items in a book List, react needs a unique key 
//containerStyle:- This apply style to the container that wrap the List items 
//renderItem:- This return a template Func, runs for each individual item in List
//Inside template, It tells react how each item in the List should look
//Pressable:- used to tapped the card component, card to display books & ThemedText
//component show the book title & author 


const Book = () => {
    const { books } = useBook()
    const router = useRouter()
  return (
    <ThemedView style = {styles.container} safe={true}>
        
        <Spacers />
        <ThemedText style = {styles.title} title={true}>
            Reading a List of Books
        </ThemedText>
        
        <Spacers />
        <FlatList 
          data={books}
          keyExtractor={(item) => item.$id}
          contentContainerStyle= {styles.list}
          style={{ flex: 1, width: '100%' }}
          renderItem={({item}) => (
            <Pressable onPress={() => router.push(`/Home/books/${item.$id}`)}>
                <ThemedCard style= {styles.card}>
                    <ThemedText style= {styles.title}>{item.title}</ThemedText>
                    <ThemedText>Written By {item.author}</ThemedText>
                </ThemedCard>
            </Pressable>
          )}
        />
    </ThemedView>
    
  )
}

export default Book

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    list: {
        // Add some extra space at the bottom inside your FlatList content 
        // Without this, Last item sits right at the Edge of bottom 
        // Hard to scroll Past the last one
        paddingBottom: 40
    },
    card: {
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 10,
        padding: 10,
        paddingLeft: 14,
        borderLeftColor: Colors.primary,
        borderLeftWidth: 4
    }
})