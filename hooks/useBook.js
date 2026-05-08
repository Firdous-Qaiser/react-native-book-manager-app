import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";


export function useBook() {
const context = useContext(BooksContext)
//context:- contains all the value of the object 

if(!context) {
    throw new Error('useBooks must be used within a BooksProvider');   
}
    return context
}