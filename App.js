import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// import Screen1 and Screen2 components
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();  // returns an object with two properties: Navigator and Screen

// Think of a stack navigator like a pile of paper: you start with one sheet, then place a second sheet on 
// top of it, then a third sheet, and so on. To get back to the bottom of the pile, you’d remove the uppermost 
// sheet of paper from your stack, then the second, and then the third. This concept is often used in app navigation.

// Stack Navigator is a type of navigator that provides a way for your app to transition between screens where each
// new screen is placed on top of a stack. The stack navigator provides a way for your app to transition between screens
// where each new screen is placed on top of a stack.

// Each STACK SCREEN needs to receive two props: name and component. The name prop is a string that will be used to
// identify the screen, while the component prop is the component that will be rendered when the screen is active.

// initialRouteName prop is used to specify the initial screen that will be displayed when the navigator is first rendered.
// this can be placed on any navigator, not just the stack navigator.

const App = () => {
   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="Screen1"
         >
            <Stack.Screen
               name="Screen1"
               component={Screen1}
            />
            <Stack.Screen
               name="Chat"
               component={Chat}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default App;