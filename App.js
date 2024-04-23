// require('dotenv').config() is used to load environment variables from a .env file into process.env
require('dotenv').config();

// React and Expo imports
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// Firebase and Firestore imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Component imports
import Start from './components/Start';
import Chat from './components/Chat';

// Logbox Import/Implement --Ignore warning about AsyncStorage
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
LogBox.ignoreLogs(["@firebase/auth:"]);
LogBox.ignoreAllLogs();


// Create the navigator
const Stack = createNativeStackNavigator();  // returns an object with two properties: Navigator and Screen

// Think of a stack navigator like a pile of paper: you start with one sheet, then place a second sheet on 
// top of it, then a third sheet, and so on. To get back to the bottom of the pile, you’d remove the uppermost 
// sheet of paper from your stack, then the second, and then the third. This concept is often used in app navigation.

// Stack Navigator is a type of navigator that provides a way for your app to transition between screens where each
// new screen is placed on top of a stack. The stack navigator provides a way for your app to transition between screens
// where each new screen is placed on top of a stack.

// Each STACK SCREEN needs to receive two props: name and component. The name prop is a string that will be used to
// identify the screen, while the component prop is the component that will be rendered when the screen is active.

// initialRouteName prop is used to specify the initial screen that will be displayed when the navigator is first rendered.
// this can be placed on any navigator, not just the stack navigator.

const App = () => {
   // Firebase configuration
   const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);

   // Initialize Cloud Firestore and get a reference to the service
   const db = getFirestore(app);

   const toastConfig = {
      success: (props) => (
         <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
               fontSize: 17,
               fontWeight: '700'
            }}
         />
      ),
      error: (props) => (
         <ErrorToast
            {...props}
            style={{ borderLeftColor: 'red' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
               fontSize: 17,
               fontWeight: '700'
            }}
         />
      ),
   };

   return (
      <>
         <NavigationContainer>
            <Stack.Navigator
               initialRouteName="Start"
            >
               <Stack.Screen
                  name="Start"
                  component={Start}
               />
               <Stack.Screen
                  name="Chat"
               >
                  {props => <Chat db={db} {...props} />}
               </Stack.Screen>
            </Stack.Navigator>
         </NavigationContainer>
         <Toast config={toastConfig} />
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default App;