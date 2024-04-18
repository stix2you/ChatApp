import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Screen2 = ({ route, navigation }) => {  // the route prop consists of the route.params object, 
   const { name, selectedColor } = route.params;  // Destructure the route.params object to get the name and selectedColor values
   // this assigns the name and selectedColor values from the route.params object to the name and selectedColor variables within 
   // the Screen2 component

   useEffect(() => {
      navigation.setOptions({ title: name });
   }, []);

   const styles = StyleSheet.create({
      container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: selectedColor,
      }
   });

   return (
      <View style={styles.container}>
         <Text>Hello Screen2!</Text>
      </View>
   );
}

export default Screen2;