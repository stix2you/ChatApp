import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Toast from 'react-native-toast-message';

// CustomActions component, provides a custom action button for the user to 
// send images, take photos, or send their location
const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
   const actionSheet = useActionSheet();

   // function called when user presses the '+' button, 
   // opens action sheet menus,calls the appropriate function based on the user selection
   const onActionPress = () => {
      const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      actionSheet.showActionSheetWithOptions(
         {
            options,
            cancelButtonIndex,
         },
         async (buttonIndex) => {
            switch (buttonIndex) {
               case 0:
                  pickImage();
                  return;
               case 1:
                  takePhoto();
                  return;
               case 2:
                  getLocation();
               default:
            }
         },
      );
   };

   // Function to generate a unique reference for the image to upload to Firebase Storage
   const generateReference = (uri) => {
      const timeStamp = (new Date()).getTime();
      const imageName = uri.split("/")[uri.split("/").length - 1];
      return `${userID}-${timeStamp}-${imageName}`;
   };

   // Function to pick an image from the library
   const pickImage = async () => {
      let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissions?.granted) {
         let result = await ImagePicker.launchImageLibraryAsync();
         if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      } else showNoPermissionsToast();
   };

   // Function to upload and send an image
   const uploadAndSendImage = async (imageURI) => {
      try {
         const uniqueRefString = generateReference(imageURI);
         const newUploadRef = ref(storage, uniqueRefString);
         const response = await fetch(imageURI);
         const blob = await response.blob();
         uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref)
            onSend({ image: imageURL })
         });
      } catch (error) {
         showUploadErrorToast();
      }
   };

   // Function to take a photo
   const takePhoto = async () => {
      let permissions = await ImagePicker.requestCameraPermissionsAsync();
      if (permissions?.granted) {
         let result = await ImagePicker.launchCameraAsync();
         if (!result.canceled) await uploadAndSendImage(result.assets[0].uri); 
      } else showNoPermissionsToast();
   };

   // Function to get the user's location, including permissions fetching
   const getLocation = async () => {
      let permissions = await Location.requestForegroundPermissionsAsync();
      if (permissions?.granted) {
         const location = await Location.getCurrentPositionAsync({});
         if (location) {
            onSend({
               location: {
                  longitude: location.coords.longitude,
                  latitude: location.coords.latitude,
               },
            });
         } else showLocationErrorToast();
      } else showNoPermissionsToast();
   };


   return (
      <TouchableOpacity
         accessible={true}
         accessibilityLabel="Action Button"
         accessibilityHint="Expands options menu for more actions."
         style={styles.container}
         onPress={onActionPress}>
         <View style={[styles.wrapper, wrapperStyle]}>
            <Text style={[styles.iconText, iconTextStyle]}>+</Text>
         </View>
      </TouchableOpacity>
   );
}

// Stylesheet
const styles = StyleSheet.create({
   container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
   },
   wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
      alignItems: 'center',
   },
   iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 13,
      backgroundColor: 'transparent',
      textAlign: 'center',
   },
});

// TOAST message definitions:
// no permissions message
const showNoPermissionsToast = () => {
   Toast.show({
      type: 'error',
      position: 'bottom',
      bottomOffset: 150,
      text1: "Permissions haven't been granted.",
      visibilityTime: 3000,
   });
};
// upload error message
const showUploadErrorToast = () => {
   Toast.show({
      type: 'error',
      position: 'bottom',
      bottomOffset: 150,
      text1: 'Error uploading image!',
      visibilityTime: 3000,
   });
};
// location error message
const showLocationErrorToast = () => {
   Toast.show({
      type: 'error',
      position: 'bottom',
      bottomOffset: 150,
      text1: 'Error fetching location!',
      visibilityTime: 3000,
   });
};

export default CustomActions;