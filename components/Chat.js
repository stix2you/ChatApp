import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => { // the route prop consists of the route.params object, 
   const [messages, setMessages] = useState([]);  // set state of messages to an empty array
   const { name, userID, selectedColor } = route.params;  // Destructure the route.params object to get the name and selectedColor values
   // this assigns the name and selectedColor values from the route.params object to the name and selectedColor variables within 
   // the Chat component

   // Set the title of the screen to the name value, we hit this only once when the component mounts, no dependencies
   useEffect(() => {
      navigation.setOptions({ title: name });
   }, []);

   // Query the messages collection in Firestore, create a listener for changes to the messages collection in Firestore
   useEffect(() => {
      navigation.setOptions({ title: name });   // set the title of the screen to the name value
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));  // query the messages collection in Firestore
      const unsubMessages = onSnapshot(q, (docs) => {  // create a listener for changes to the messages collection in Firestore
         let newMessages = [];
         docs.forEach(doc => {
            newMessages.push({
               id: doc.id,
               ...doc.data(),
               createdAt: new Date(doc.data().createdAt.toMillis())
            })
         })
         setMessages(newMessages);  // set the messages state to the newMessages array
      })
      return () => {
         if (unsubMessages) unsubMessages();  // unsubscribe from the listener when the component unmounts
      }
   }, []);

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

   // return the GiftedChat component with props: messages, onSend function, and user prop -- see documentation for more props
   return (
      <View style={styles.container}>
         <GiftedChat
            messages={messages}
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