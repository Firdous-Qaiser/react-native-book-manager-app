import { useUser } from '../../hooks/useUser'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Text } from 'react-native'
import ThemedLoader from '../ThemedLoader'

// create UserOnly Func with export module, means share across components
// Going to wrap this hook around (auth) Layout 

const GuestOnly = ( {children} ) => {
    const { user, authchecked } = useUser()
    const router = useRouter() // Protected route

// useEffect is used to add side effects in the app, this effect runs everytime 
// when user & authchecked updated
// checks if user's exist then redirect to Profile page
    useEffect(() => {
        if( authchecked && user !== null) {
            router.replace('/Home')
        }
    }, [user, authchecked])
    
    // show Loader while we wait for auth to be checked, 
    // OR
    // while redirecting to Profile page if the users exit
    if( !authchecked || user) {
        return (
            <ThemedLoader />
        )
    }
    // return if the user doesn't exist 
    return children
        
}
export default GuestOnly