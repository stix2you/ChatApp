import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message'; // TOAST configuration end of file below return statement and any styles
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => { // the route prop consists of the route.params object, 
   const [messages, setMessages] = useState([]);  // set state of messages to an empty array
   const { name, userID, selectedColor } = route.params;  // Destructure the route.params object to get the name and selectedColor values
   // this assigns the name and selectedColor values from the route.params object to the name and selectedColor variables within 
   // the Chat component

   // Set the title of the screen to the name value, we hit this only once when the component mounts, no dependencies
   useEffect(() => {
      navigation.setOptions({ title: name });
   }, []);

   let unsubMessages;

   // Query the messages collection in Firestore, create a listener for changes to the messages collection in Firestore
   useEffect(() => {

      if (isConnected === true) {

         // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
         if (unsubMessages) unsubMessages();
         unsubMessages = null;  // set unsubMessages to null

         // Create a query to get the messages collection in Firestore, order the messages by createdAt in descending order
         const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

         // unsubscribe from the listener when the component unmounts
         unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
               newMessages.push({
                  id: doc.id,
                  ...doc.data(),
                  createdAt: new Date(doc.data().createdAt.toMillis())
               })
            })
            cacheMessages(newMessages);  // cache the newMessages array
            setMessages(newMessages);  // set the messages state to the newMessages array
         })

      } else loadCachedMessages();  // if not connected, load the cached messages

      return () => {
         if (unsubMessages) unsubMessages();  // unsubscribe from the listener when the component unmounts
      }
   }, [isConnected]);

   // loadCachedMessages function to load cached messages from AsyncStorage
   const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem("chat_messages") || [];
      setMessages(JSON.parse(cachedMessages));
      // showLoadedCachedMessagesToast();
   }

   // cacheMessages function to cache messages in AsyncStorage
   const cacheMessages = async (messagesToCache) => {
      try {
         await AsyncStorage.setItem('chat_messages', JSON.stringify(messagesToCache));
      } catch (error) {
         console.log(error.message);
      }
   }

   // onSend function to append new messages to previous messages
   const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0]);  // add the new message to the messages collection in Firestore
   }

   // styles for the overall container -- had to put this inside the component function to access the selectedColor value
   const styles = StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: selectedColor,
      }
   });

   // renderBubble function to style the chat bubbles, prop passed to GiftedChat component below
   const renderBubble = (props) => {
      return <Bubble
         {...props}
         wrapperStyle={{
            right: {
               backgroundColor: "#000"  // black background for user messages
            },
            left: {
               backgroundColor: "#FFF"  // white background for other messages
            }
         }}
      />
   }

   // renderInputToolbar function to render the input toolbar if the user is connected
   const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
   }

   // handleLogout function to clear AsyncStorage and navigate to the Start screen
   const handleLogout = async () => {
      try {
         await AsyncStorage.clear(); // This clears all data; use removeItem if you want to clear specific data
         showLogoutToast();
         console.log('Logout successful, storage cleared.');
         navigation.reset({  // reset the navigation stack to the Start screen
            index: 0,
            routes: [{ name: 'Start' }],
         });
      } catch (error) {
         console.error('Logout failed', error);
      }
   }

   // set the headerRight option to a red Button component that calls the handleLogout function when pressed
   useEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <Button
               onPress={handleLogout}
               title="Logout"
               color="#ff5c5c"
            />
         )
      });
   }, [navigation]);

   const renderCustomActions = (props) => {
      return <CustomActions storage={storage} userID={userID} {...props} />;
   };

   // renderCustomView function to render the map view ONLY when a location is sent
   const renderCustomView = (props) => {
      const { currentMessage } = props;
      if (currentMessage.location) {
         return (
            <MapView
               style={{
                  width: 150,
                  height: 100,
                  borderRadius: 13,
                  margin: 3
               }}
               region={{
                  latitude: currentMessage.location.latitude,
                  longitude: currentMessage.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
               }}
            />
         );
      }
      return null;
   }

   // return the GiftedChat component with props: messages, renderInputToolbar, 
   // renderBubble, onSend, renderCustomActions, renderCustomView, user
   return (
      <View style={styles.container}>
         <GiftedChat
            messages={messages}
            renderInputToolbar={renderInputToolbar}
            renderBubble={renderBubble}
            onSend={messages => onSend(messages)}
            renderActions={renderCustomActions}
            renderCustomView={renderCustomView}
            user={{
               _id: userID,
               name: name
            }}
         />
         {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
         {/* KeyboardAvoidingView component to adjust the position of the 
         input field when the keyboard is displayed */}
      </View>
   )
}

// TOAST message definitions:
// Logout message
const showLogoutToast = () => {
   Toast.show({
      type: 'success',
      position: 'bottom',
      bottomOffset: 150,
      text1: 'Logged out Successfully!',
      visibilityTime: 3000,
   });
};
const showLoadedCachedMessagesToast = () => {
   Toast.show({
      type: 'success',
      position: 'bottom',
      bottomOffset: 300,
      text1: 'Loaded cached messages!',
      visibilityTime: 3000,
   });
};

export default Chat;