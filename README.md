# WELCOME TO CHAT APP!



## Project Description:

The ChatApp is a mobile app which provides users with a START screen, a very basic CHAT interface, and options to share images and their location.

Git Repo:  https://github.com/stix2you/ChatApp



## PROJECT SETUP FOR DEV ENVIRONMENT:

- Download repo from above URL and install in a directory.

- In terminal windown within that directory:

- Set up Node to version 16.19.0

   nvm install 16.19.0
   nvm use 16.19.0

- Install Expo and Expo CLI   

   npm install -g expo-cli

- Install project dependencies (see full list below):

   npm install 

- To start Dev server for mobile devices, enter:

   npm start 
(this runs expo start from a script)

- With server running:

   To reload a session, hit 'r'
   To add an android device, hit 'a'



## DEPENDENCIES:

### Dependencies as of the writing of this README.MD file, taken from package.json:

    @react-native-async-storage/async-storage: 1.21.0,
    @react-native-community/netinfo: 11.1.0,
    @react-navigation/native: ^6.1.17,
    @react-navigation/native-stack: ^6.9.26,
    dotenv: ^16.4.5,
    expo: ~50.0.14,
    expo-constants: ^15.4.6,
    expo-status-bar: ~1.11.1,
    firebase: ^10.3.1,
    image-picker: ^0.3.1,
    react: 18.2.0,
    react-native: 0.73.6,
    react-native-config: ^1.5.1,
    react-native-gifted-chat: ^2.4.0,
    react-native-maps: ^1.14.0,
    react-native-screens: ~3.29.0,
    react-native-toast-message: ^2.2.0,
    react-native-vector-icons: ^10.0.3,
    expo-image-picker: ~14.7.1,
    expo-location: ~16.5.5



## DEV ENVIRONMENT SETUP FOR DEVICES USING EXPO GO:

- Install Expo Go on a mobile device by downloading it from the relevant app store

- Upon running server in Dev environement (npm start), a QR code and an address will pop up

- Scan QR code or enter the address into Expo Go to launch the app in Expo Go on the device

- Install and configure Android Studio to create an emulated device if desired (not required) 

   https://developer.android.com/studio

- See Expo Go for more information or documentation:  https://expo.dev/





## FIREBASE DATABASE SETUP:

In order to use the app, you must set up a Firebase Firestore database, create a .env file for authentication, and set up storage parameters

Instructions follow on how to do this with specifics for this application.  It is recommended you follow these instructions or guidelines.

- Setup a Firebase database at https://firebase.google.com/

- Once logged into Firebase, select "Create a project"

- Enter the name for the project 'ChatApp'

- Enable or disable Google Analytics as you wish (for these instructions, disable this)

- Click on "Create Project" and allow Firebase to create the project

- This gets you to the overview page.  On left panel, click on 'Firestore Database'

- Select 'Create database' in middle of screen

- Select production mode or test mode as desired, for these instructions we are choosing production mode

- Chose the relevant Cloud Firestore location (likely will be default to your proper location), and click 'Enable'

- After set up, you should be on the Cloud Firestore page for the project

- You do not need to start a collection, as this is done automatically through the app, so you can leave the Data Tab alone

- No collections need to be initialized, the app will set these along with the document format within the database

- In the RULES tab, be sure to change this line:  "allow read, write: if false;"  to true, as such:

   allow read, write: if true;

- This allows free read/write access to the database, which the app requires.



## BUILDING THE AUTHENTICATION FILE FOR FIREBASE ACCESS:

- In Firebase, click 'Build' --> 'Authentication' on the left side menu

- Click 'Get started' Button

- on 'Sign-in method' tab, select 'Anonymous'

- Click 'Enable' on the form which follows to allow Anonymous sign-ins.

- From main page of your Firebase Project, select the GEAR icon and then 'Project Settings'

- Under the 'General' Tab, scroll to section 'Your Apps'

- Click the 'Firestore for Web' Button (may be shown as </> icon)

- Fill in name for app and then click 'Register app' to generate configuration code

- Copy the following information (without quotes) from firstbaseConfig object:

   apiKey
   authDomain
   projectId
   storageBucket
   messagingSenderId
   appId

- Place the information into the relevant fields (without quotes) into the file .env-template in the root directiory

- Rename ".env-template" to ".env"   (this file will be ignored by git repositories, so it's safe to store keys and sensitive data in this file)



## FIREBASE STORAGE SETUP FOR MEDIA FILES:

- This is required in order to be able to store images in Firestore

- In Firebase, select the project again and select "Storage" from the left side pane

- Click 'Get Started' in the middle of tha page

- Again, select Production Mode and your region in the next menus, Firebase will then set up the Storage bucket

- As before, go to the 'Rules' tab and be sure to change this line:  "allow read, write: if false;"  to true, as such:

   allow read, write: if true;

- This allows free read/write access to the database, which the app requires.


