import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Screen2 = ({ route, navigation }) => {  // the route prop consists of the route.params object, 
   const { name, selectedColor } = route.params;  // Destructure the route.params object to get the name and selectedColor values
   // this assigns the name and selectedColor values from the route.params object to the name and selectedColor variables within 
   // the Screen2 component

   // Update the title of the screen to the name value, we hit this only once when the component mounts, no dependencies
   useEffect(() => {
      navigation.setOptions({ title: name });
   }, []);

   // styles for the overall container -- had to put this inside the component function to access the selectedColor value
   const styles = StyleSheet.create({
      container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: selectedColor,
      }
   });

   // Return the JSX for the Screen2 component -- currently mostly empty but will be updated in the next step
   return (
      <View style={styles.container}>
         <Text>Hello Screen2!</Text>
      </View>
   );
}

export default Screen2;