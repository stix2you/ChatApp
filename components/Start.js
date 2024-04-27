import { useState, useEffect } from 'react';
import {
   StyleSheet, View, Text, TouchableOpacity,
   TextInput, ImageBackground, Keyboard,
   KeyboardAvoidingView, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, signInAnonymously } from "firebase/auth";
import Toast from 'react-native-toast-message'; // TOAST configuration end of file below styles

// START component, opening screen of app, has input fields for user name and background color selection
const Start = ({ navigation }) => {
   const auth = getAuth();  // getAuth() function to initialize the Firebase Authentication service
   const [name, setName] = useState('');  // Initialize name state variable
   const [selectedColor, setSelectedColor] = useState('#090C08'); // Initialize selectedColor state variable
   const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];   // Array of color options specified by project brief, do not change
   const image = require('../assets/Background_Image.png');    // Background image specified by project brief
   const [keyboardVisible, setKeyboardVisible] = useState(false);  // Initialize keyboardVisible state variable for toggle effect

   // Sign in anonymously
   const signInUser = () => {
      signInAnonymously(auth)
         .then(result => {  // if successful, navigate to ShoppingLists screen
            navigation.navigate('Chat', { userID: result.user.uid, name: name, selectedColor: selectedColor });
            showSuccessToast();
         })
         .catch((error) => {  // if error, show an alert
            showErrorToast();
         })
   }

   // useEffect hook to listen for keyboard events, this is used to hide the color selection when the keyboard is visible
   useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
         setKeyboardVisible(true); // Set state to true when keyboard is shown
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
         setKeyboardVisible(false); // Set state to false when keyboard is hidden
      });

      return () => {
         showSubscription.remove();
         hideSubscription.remove();
      };
   }, []);

   return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
         <View style={styles.container}>
            <Text style={styles.textDisplay}
               accessible={true}
               accessibilityLabel="App Title"
               accessibilityRole="text">
               Chat App</Text>
            <View style={styles.inputContainer}>
               <TextInput
                  style={styles.textInput}
                  value={name}
                  accessible={true}
                  accessibilityLabel="Name Input Field"
                  accessibilityHint="Lets you input the name you wish to use while chatting."
                  onChangeText={setName}
                  placeholder='Your Name'
               />
               <Icon name="person-outline" size={30} color="#ccc" style={styles.icon} />
               {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
               {!keyboardVisible && (
                  <Text style={styles.colorChoiceLabel}>Choose Background Color:</Text>
               )}
               {!keyboardVisible && (
                  <View style={styles.colorContainer}>
                     {colors.map((color) => (
                        <TouchableOpacity
                           accessible={true}
                           accessibilityLabel="Color Option"
                           accessibilityHint="Lets you choose the background color for the chat dialogue."
                           accessibilityRole="button"
                           key={color}
                           style={[styles.colorCircle, { backgroundColor: color, borderWidth: selectedColor === color ? 2 : 0 }]}
                           onPress={() => setSelectedColor(color)}
                        />
                     ))}
                  </View>
               )}
               {!keyboardVisible && (
                  <TouchableOpacity
                     style={styles.button}
                     title='Start Chatting'
                     accessible={true}
                     accessibilityLabel="Start Chatting Button"
                     accessibilityHint="Enters Chatting Dialogue Screen."
                     accessibilityRole="button"
                     onPress={signInUser}
                  >
                     <Text style={styles.buttonText}>Start Chatting</Text>
                  </TouchableOpacity>
               )}
            </View>
         </View>
      </ImageBackground >
   );
}

// ALL STYLESHEETS:
const styles = StyleSheet.create({
   // Style for the background image
   image: {
      flex: 1,
   },
   // Style for the container that holds the app title, input fields, and button
   container: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
   },
   // Style for the app title itself
   textDisplay: {
      flex: 1,
      marginTop: '20%',
      height: '44%',
      fontSize: 45,
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
   },
   // Style for the container that holds the input fields and button
   inputContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      position: 'relative',  // Position the container relative to the parent
      width: '88%',
      height: '44%',
      alighItems: 'center',  // Center the container horizontally
      bottom: '4%',
   },
   // Style for the text input field itself
   textInput: {
      width: "88%",
      height: 60,
      alignItems: 'center', // Center the text input horizontally within the parent container
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 2,
      margin: 20,
      fontSize: 16,
      fontWeight: '300',
      color: '#757083',
      paddingVertical: 10,  // Add padding to the top and bottom of the text input
      paddingLeft: 50, // Adjust padding to make space for the icon inside the field
   },
   // Style for the icon inside the text input field
   icon: {
      position: 'absolute', // Position the icon absolutely within the inputContainer, NOT RELATIVE TO TEXT FIELD
      left: 30,
      top: 35,
   },
   // Style for the color choice label
   colorChoiceLabel: {
      flex: 1,
      fontSize: 16,
      marginLeft: 15,
   },
   // Style for the color circles container
   colorContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      width: '100%',
   },
   // Style for the individual color circles (within the colorContainer)
   colorCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderColor: 'black',
   },
   // Style for the button to navigate to the next screen
   button: {
      height: 60,  // Button height
      backgroundColor: '#757083', // Button color
      alignItems: 'center', // Center the button horizontally within the parent container
      width: '88%',
      padding: 12,  // Padding inside the button
      margin: 20,
   },
   // Style for the text inside the button
   buttonText: {
      fontSize: 16,         // Font size
      fontWeight: '800',    // Font weight
      paddingTop: 6.5,          // Padding inside the button
      color: '#FFFFFF',     // Font color
      textAlign: 'center',  // Center the text inside the button
   }
});

// TOAST message definitions:
// Success message
const showSuccessToast = () => {
   Toast.show({
      type: 'success',
      position: 'bottom',
      bottomOffset: 150,
      text1: 'Signed in Successfully!',
      visibilityTime: 3000,
   });
};
// Error message
const showErrorToast = () => {
   Toast.show({
      type: 'error',
      position: 'bottom',
      bottomOffset: 150,
      text1: 'Unable to sign in, contact developer or try later!',
      visibilityTime: 3000,
   });
};

export default Start;