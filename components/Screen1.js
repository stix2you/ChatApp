import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Screen1 = ({ navigation }) => {
   const [name, setName] = useState('');
   const [selectedColor, setSelectedColor] = useState('#090C08');

   const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

   const image = require('../assets/Background_Image.png');

   return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
         <View style={styles.container}>
            <Text style={styles.textDisplay}>App Title</Text>
            <View style={styles.inputContainer}>
               <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                  placeholder='Your Name'
               />
               <Icon name="person-outline" size={30} color="#ccc" style={styles.icon} />
               <Text style={styles.colorChoiceLabel}>Choose Background Color:</Text>
               <View style={styles.colorContainer}>
                  {colors.map((color) => (
                     <TouchableOpacity
                        key={color}
                        style={[styles.colorCircle, { backgroundColor: color, borderWidth: selectedColor === color ? 2 : 0 }]}
                        onPress={() => setSelectedColor(color)}
                     />
                  ))}
               </View>
               <TouchableOpacity
                  style={styles.button}
                  title='Start Chatting'

                  onPress={() => navigation.navigate('Screen2', { name: name, selectedColor: selectedColor })}
               >
                  <Text style={styles.buttonText}>Start Chatting</Text>
               </TouchableOpacity>
            </View>
         </View>
      </ImageBackground>
   );
}

const styles = StyleSheet.create({
   image: {
      flex: 1,
   },
   container: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
   },
   textDisplay: {
      flex: 1,
      marginTop: '20%',
      height: '44%',
      fontSize: 45,
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
   },
   inputContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      position: 'relative',  // Position the container relative to the parent
      width: '88%',
      height: '44%',
      alighItems: 'center',  // Center the container horizontally
      bottom: '4%',
   },
   textInput: {
      flex: 1,
      width: "88%",
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
   icon: {
      position: 'absolute', // Position the icon absolutely within the inputContainer (not the text field itself)
      left: 30, // Position based on your styling preferences
      top: 35, // Adjust top to vertically center the icon with the text
   },
   colorChoiceLabel: {
      flex: 1,
      fontSize: 16,
      marginLeft: 15,
   },
   colorContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      width: '100%',
   },
   colorCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderColor: 'black',
   },
   button: {
      flex: 1,
      backgroundColor: '#757083', // Button color
      alignItems: 'center', // Center the button horizontally within the parent container
      width: '88%',
      padding: 12,  // Padding inside the button
      margin: 20,
   },
   buttonText: {
      fontSize: 16,         // Font size
      fontWeight: '800',    // Font weight
      paddingTop: 6.5,          // Padding inside the button
      color: '#FFFFFF',     // Font color
      textAlign: 'center',  // Center the text inside the button
   }
});

export default Screen1;