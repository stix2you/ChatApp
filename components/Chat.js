import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => { // the route prop consists of the route.params object, 
   const [messages, setMessages] = useState([]);  // set state of messages to an empty array
   const { name, selectedColor } = route.params;  // Destructure the route.params object to get the name and selectedColor values
   // this assigns the name and selectedColor values from the route.params object to the name and selectedColor variables within 
   // the Chat component

   // Set the title of the screen to the name value, we hit this only once when the component mounts, no dependencies
   useEffect(() => {
      navigation.setOptions({ title: name });
   }, []);

   // set state of messages to an array of objects, no dependencies
   // images and videos can be set as objects with a uri property, see Gifted Text Documentation in documentation folder
   useEffect(() => {
      setMessages([
         {
            _id: 1,
            text: "Hello developer",
            createdAt: new Date(),
            user: {
               _id: 2,
               name: "React Native",
               avatar: "https://placeimg.com/140/140/any",
            },
         },
         {
            _id: 2,
            text: 'This is a system message',
            createdAt: new Date(),
            system: true,
         },
      ]);
   }, []);

   // onSend function to append new messages to previous messages
   const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))  // append new messages to previous messages via the setMessages function
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
               _id: 1
            }}
         />
         {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
   )
}

export default Chat;