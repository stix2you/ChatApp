Project Description:
The ChatApp is a mobile app which provides users with a chat interface and options to share images and their location.

Git Repo:  https://github.com/stix2you/ChatApp

Download repo and install in a directory.

In terminal windown within that directory:

- Set up Node to version 16.19.0
- Install Expo and Expo CLI   "npm install -g expo-cli"
- enter 'npm install'  to install the following dependencies:

Dependencies:
    "@react-native-async-storage/async-storage": "1.21.0",
    "@react-native-community/netinfo": "11.1.0",
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/native-stack": "^6.9.26",
    "dotenv": "^16.4.5",
    "expo": "~50.0.14",
    "expo-constants": "^15.4.6",
    "expo-status-bar": "~1.11.1",
    "firebase": "^10.3.1",
    "image-picker": "^0.3.1",
    "react": "18.2.0",
    "react-native": "0.73.6",
    "react-native-config": "^1.5.1",
    "react-native-gifted-chat": "^2.4.0",
    "react-native-maps": "^1.14.0",
    "react-native-screens": "~3.29.0",
    "react-native-toast-message": "^2.2.0",
    "react-native-vector-icons": "^10.0.3",
    "expo-image-picker": "~14.7.1",
    "expo-location": "~16.5.5"




DATABASE SETUP:
- Setup a Firebase database, be sure to allow 'read-write' queries on the database: Change 'false' to 'true' on this line:

allow read, write: if true;

- No collections need to be initialized, the app will set these along with the document format within the database



Set up dev environment: 
- Install Expo Go app on any mobile devices for testing   https://expo.dev/
- After installing Expo Go on mobile device, launch dev server in terminal with 'npm start'
- Once loaded, scan the QR code from the terminal on the mobile device within Expo Go
- Recommend using Android Studio for additional testing   https://developer.android.com/studio
- With Android Studio, set up an appropriate mobile device emulator, start dev server, and hit 'a' in terminal to launch on emulator device


Make sure you’ve included all the necessary steps someone would have to follow to set up your chat app:
Setting up the development environment (Expo, Android Studio, etc.);
Database configuration (which one, where to put database credentials, etc.);
Necessary libraries to install.


