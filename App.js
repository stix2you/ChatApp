// import expo constants to access environment variables
import Constants from 'expo-constants';

// React and Expo imports
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast, { BaseToast, ErrorToast, LoadingToast } from 'react-native-toast-message'; // Configuration end of file below styles
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from "react";

// Firebase and Firestore imports
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

const App = () => {
   // set expo constants to access environment variables
   const { apiKey } = Constants.expoConfig.extra;
   const { authDomain } = Constants.expoConfig.extra;
   const { projectId } = Constants.expoConfig.extra;
   const { storageBucket } = Constants.expoConfig.extra;
   const { messagingSenderId } = Constants.expoConfig.extra;
   const { appId } = Constants.expoConfig.extra;

   // Firebase configuration
   const firebaseConfig = {
      apiKey: apiKey,
      authDomain: authDomain,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);

   // Initialize Cloud Firestore and get a reference to the service
   const db = getFirestore(app);

   // Initialize Firebase Storage handler
   const storage = getStorage(app);


   // useNetInfo hook to get the current network connection status
   const connectionStatus = useNetInfo();

   // useEffect hook to check the connection status and disable Firestore network if the connection is lost
   useEffect(() => {
      if (connectionStatus.isConnected === false) {
         showConnectionLostToast();
         disableNetwork(db);
      } else if (connectionStatus.isConnected === true) {
         showConnectionRestoredToast();
         enableNetwork(db);
      }
   }, [connectionStatus.isConnected]);

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
                  {props => <Chat
                     isConnected={connectionStatus.isConnected}
                     db={db} {...props}
                     storage={storage}
                     {...props}
                  />}
               </Stack.Screen>
            </Stack.Navigator>
         </NavigationContainer>
         <Toast config={toastConfig} />
      </>
   );
}

// Stylesheets for the App component
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

// Configure TOAST messages:
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
   loading: (props) => (
      <LoadingToast
         {...props}
         style={{ borderLeftColor: 'blue' }}
         contentContainerStyle={{ paddingHorizontal: 15 }}
         text1Style={{
            fontSize: 17,
            fontWeight: '700'
         }}
      />
   ),
};

// TOAST message definitions:
// Function to show a Toast message when the connection is lost
const showConnectionLostToast = () => {
   Toast.show({
      type: 'error',
      position: 'bottom',
      bottomOffset: 150,
      text1: 'Connection lost!',
      autoHide: false,
      swipeable: true,
   });
};

const showConnectionRestoredToast = () => {
   Toast.show({
      type: 'success',
      position: 'bottom',
      bottomOffset: 150,
      text1: 'Connected!',
      visibilityTime: 3000,
   });
}

export default App;