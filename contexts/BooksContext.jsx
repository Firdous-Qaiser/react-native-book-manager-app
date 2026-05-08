import { createContext, useEffect, useState } from "react";
import { databases, client } from "../lib/appwrite";
import { ID, Permission, Query, Role} from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

// Going to create a reading List by adding books, First create DB by adding books 
// then Fetch the dataList with Id

const DATABASE_ID = '69b5d4e6002ffb1e0485'
const TABLE_ID = 'books'

export const BooksContext = createContext()

export function BooksProvider( {children} ) {
    
    // Start with the empty creation, no book is create yet
    const [books, setBooks] = useState([])
    const { user } = useUser()

    async function fetchBooks() {
    // Going to fetch the Books created by the user
        try 
        {
            // Appwrite database Func that returns a List of document (array))
            // from collection (Table).
            // await:- Pause the JavScript Func execution until data returned from 
            // database server
            const response = await databases.listDocuments(
                DATABASE_ID,
                TABLE_ID,
                [
                    // Used Query method to fetch a chunck of data from database
                    // Only Fetch the List of book created by user
                    Query.equal('userId', user.$id)
                ]
            )
            // Appwrite not only returns the document array instead returns a big 
            // object containing documents+meta
            // Used response.document to tell that React State excepts an array of 
            // Books not Full object          
            setBooks(response.documents)
        }
        catch(error) {
            console.error(error.message)
        }
    }

    
    async function fetchBookById(id) {
        // Fetch Single record from document with the Id 
        try {
            // A way to get single record
            const response = await databases.getDocument(
                DATABASE_ID,
                TABLE_ID,
                id              
            )
            // return a record
            return response
        }
        catch(error) {
            console.error(error.message)
        }
    }

    
    async function createBook(data) {
        try 
        {
            // Create an instance of table in a database
            // Within parenthesis, we pass database & Table Id
            // Data Object and replace userId property with defined value
            // Pass an array of permission, define which users has right to do actions 
            
            const newBook = await databases.createDocument(
                DATABASE_ID,
                TABLE_ID,
                ID.unique(),
                {...data, userId: user.$id},
                [ 
                    // user from the userContext that have the state of user, who Logged in 

                    // users who create the book, Logged in users are allowed to do actions
                    // Permission, Role are the react-native appwrite classes
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id))
                ]                
            )
        }
        catch(error) {
            console.error(error.message)
        }
    }

    
    async function deleteBook(id) {
        try 
        {
            await databases.deleteDocument(
                DATABASE_ID,
                TABLE_ID,
                id             
            )

        }
        catch(error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        // Here, we work with REAL-TIME DATA in Appwrite, to Listen & notify changes 
        // For this, we need a channel, which we can subscribe and Listen to
        let unsubscribe
        // a channel in appwrite is a string path or some service on a server that 
        // we want to subscribe, In our case a path to the documents in book collection
        const channel = `databases.${DATABASE_ID}.collections.${TABLE_ID}.documents`
        
        // If user exist, then fetch an array of books associated to the user
        if(user) {
            fetchBooks()
            // client is import from appwrite File
            // 'client.subscribe' template returns a Func to unsubscribe
            // Passing args to Func, First is channel & callBack Func
            // Passing Response = contains information of whatever event occurs
            // Inside, access RESPONSE object Properties 
            // Payload = associate with data of events, # record of book gthat have just created
            // events =  Contains an array of strings which triggered or triggers to response
                unsubscribe = client.subscribe(channel, (response) => {
                const { payload, events } = response
                console.log(events)

                // add condition, now take First string from events array to check it out, 
                // if the trigger event is 'CREATE'
                // YES, then update the React book state
                // update = keep the prevBook state correctly and add new Book record (payload) 
                if(events[0].includes('create')) {
                    setBooks((prevBooks) => [...prevBooks, payload])
                }
                // Gonna Use Real-time delete event to make sure that the book
                // delete from the databases & the book screen 
                // Maintain data consistency  
                if (events[0].includes("delete")) {
                    // apply Filter Func on prevBooks data 
                    // Use condition, match individual BookId with 
                    // data record of payload (contain recently deleteId)
                    // if matched, then drop the record & 
                    // Filter unmatched book data
                setBooks((prevBooks) => prevBooks.filter((book) => book.$id !== payload.$id))
        }

            })
        }
        // if user Logout then remove the Book List
        else {
            setBooks([])
        }
        
        // At the end, Invoke the unsubscribe() Func
        // This is useEffect cleanup pattern, to unsubscribe from real-time event, 
        // whenever the component unmount or useEffect re-runs
        return () => {
            if(unsubscribe) unsubscribe()
        }

    }, [user]) // Invoke everyTime the user value Update

    return (
        <BooksContext.Provider 
          value = {{books, fetchBooks, fetchBookById, createBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    )
}