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

                  onPress={() => navigation.navigate('Screen2', { name: name })}
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
      position: 'absolute',
      width: '88%',
      height: '44%',
      paddingLeft: 10,
      paddingRight: 10,
      bottom: '4%',
   },
   textInput: {
      width: "88%",
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 2,
      margin: 15,
      fontSize: 16,
      fontWeight: '300',
      color: '#757083',
      paddingVertical: 15,
      paddingLeft: 45, // Adjust padding to make space for the icon inside the field
   },
   icon: {
      position: 'absolute', // Position the icon absolutely
      left: 35, // Position based on your styling preferences
      top: 30, // Adjust top to vertically center the icon with the text
   },
   colorChoiceLabel: {
      fontSize: 16,
      marginBottom: 10,
      marginLeft: 15,
   },
   colorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      width: '100%',
   },
   colorCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderColor: 'black',
   },
   button: {
      backgroundColor: '#757083', // Button color
      width: '88%',
      padding: 12,
      margin: 20,
      height: 60,
   },
   buttonText: {
      fontSize: 16,         // Font size
      fontWeight: '800',    // Font weight
      paddingTop: 4,          // Padding inside the button
      color: '#FFFFFF',     // Font color
      textAlign: 'center',  // Center the text inside the button
   }
});

export default Screen1;