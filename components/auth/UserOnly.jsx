import { useUser } from '../../hooks/useUser'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Text } from 'react-native'
import ThemedLoader from '../ThemedLoader'

// create UserOnly Func with export module, means share across components
// Going to wrap this hook around Layout stack

const UserOnly = ( {children} ) => {
    const { user, authchecked } = useUser()
    const router = useRouter() // Protected route

// useEffect is used to add side effects in the app, this effect runs everytime 
// when user & authchecked updated
// checks if user doesn't exist then redirect to Login page
    useEffect(() => {
        if( authchecked && user === null) {
            router.replace('/Login')
        }
    }, [user, authchecked])
    
    // show Loader while we wait for auth to be checked, 
    // OR
    // while redirecting to Profile page if user becomes null
    if( !authchecked || !user) {
        return (
            <ThemedLoader />
        )
    }
    // return if the user not null 
    return children
        
}
export default UserOnly