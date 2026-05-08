import { StyleSheet, Text } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState, useEffect } from "react"
import { useBook } from "../../../../hooks/useBook"
import { Colors } from "../../../../Constants/Colors"
// [id].jsx means the root to that File is Dynamic (changable)

// themed components
import ThemedText from "../../../../components/ThemedText"
import ThemedBtn from "../../../../components/ThemedBtn"
import ThemedView from "../../../../components/ThemedView"
import Spacers from "../../../../components/Spacers"
import ThemedCard from "../../../../components/ThemedCard"
import ThemedLoader from "../../../../components/ThemedLoader"

const BookDetails = () => {
    const [book, setBook ] = useState(null)
    const router = useRouter()
    // To access the book id from route, we gonna use Hook from expo-router Below
    const { id } = useLocalSearchParams()
    const { fetchBookById, deleteBook } = useBook()

    // Runs when component mounts &
    // when [id] changes runs again
    // inside, a Func which is undefined 
    // call loadBook(), 
    // Inside, call FetchById Func with passing the bookId
    // update book state from null

    const handleDelete = async () => {
    // Invoke deleteBook() Func
    await deleteBook(id)
    setBook(null)
    // Replace Page with books screen
    router.replace('/Home/book')
    }

    useEffect(() => {
        async function loadBook() {
            const bookData = await fetchBookById(id)
            setBook(bookData)
        }
        loadBook()
    }, [id])

    if(!book) 
        
    { // when the component renders, & bookData would not load yet 
      // then shows the themedLoader
        return (
           <ThemedView safe={true} style={styles.container}>
              <ThemedLoader />
           </ThemedView>
       )
    }

  return (
    <ThemedView safe={true} style={styles.container}>
        <ThemedCard style={styles.card}>
            
            <ThemedText>Book Detail - { id }</ThemedText>
            <ThemedText style={styles.title}>{book.title}</ThemedText>
            <ThemedText>Written by {book.author}</ThemedText>
            <Spacers />
            
            <ThemedText title={true}>Book description:</ThemedText>
            <Spacers height={10} />
            
            <ThemedText>{book.description}</ThemedText>
       
       </ThemedCard>
       <ThemedBtn onPress={handleDelete} style={styles.delete}>
           <Text style={{ color: '#fff', textAlign: 'center' }}>
               Delete Book
           </Text>
      </ThemedBtn>
    </ThemedView>
  )
}

export default BookDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // All child elements can expand to fill the available
    // space, it's a CSS Flexbox or Grid
    // Use to control the Layout, Horizontally, Vertically
    alignItems: "stretch",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    margin: 20
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  }
})