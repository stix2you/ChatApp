import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const Screen1 = ({ navigation }) => {
   const [name, setName] = useState('');

   return (
      <View style={styles.container}>
         <Text style={styles.textDisplay}>Hello Screen1!</Text>
         <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
         />
         <Button
            title="Go to Screen 2"
            onPress={() => navigation.navigate('Screen2', { name: name})}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#00ffff',
      justifyContent: 'center',
      alignItems: 'center'
   },
   textInput: {
      width: "88%",
      fontSize: 20,
      padding: 15,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 15,
      marginBottom: 15
   },
   textDisplay: {
      color: 'darkslateblue',
      fontSize: 20,
   },
});

export default Screen1;