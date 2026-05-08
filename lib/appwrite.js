import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

// First, create Lib root directory, inside the directory create setup File to register 
// the appWrite backend.
// The Following are JavaSrcipt/TypeScript export module, create instance of classes and available 
// to other files.
// create an instance (object) of classes, named as Client, Account, and Avatars
// Export them so that other modules can Import it
// client (object) passed as a parameters to Account, and Avatars class constructors

export const client = new Client()
    .setProject("69b0645a000f6af34de2")
    .setEndpoint("https://fra.cloud.appwrite.io/v1");

export const account = new Account(client)
export const avatar = new Avatars(client)
export const databases = new Databases(client)