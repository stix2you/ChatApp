import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => { // the route prop consists of the route.params object, 
   const [messages, setMessages] = useState([]);  // set state of messages to an empty array
   const { name, userID, selectedColor } = route.params;  // Destructure the route.params object to get the name and selectedColor values
   // this assigns the name and selectedColor values from the route.params object to the name and selectedColor variables within 
   // the Chat component

   // Set the title of the screen to the name value, we hit this only once when the component mounts, no dependencies
   useEffect(() => {
      navigation.setOptions({ title: name });
   }, []);

   const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem("chat_messages") || [];
      setMessages(JSON.parse(cachedMessages));
   }

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
   }, []);

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

   // return the GiftedChat component with props: messages, onSend function, and user prop -- see documentation for more props
   return (
      <View style={styles.container}>
         <GiftedChat
            messages={messages}
            renderInputToolbar={renderInputToolbar}
            renderBubble={renderBubble}
            onSend={messages => onSend(messages)}
            user={{
               _id: userID,
               name: name
            }}
         />
         {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
   )
}

export default Chat;