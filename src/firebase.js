// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_mXiU9kzeLm83POlGJzmors3wwUngFGQ",
  authDomain: "museum-signage-37925190-100ae.firebaseapp.com",
  projectId: "museum-signage-37925190-100ae",
  storageBucket: "museum-signage-37925190-100ae.firebasestorage.app",
  messagingSenderId: "844193426951",
  appId: "1:844193426951:web:4fd8470464c09c965c84a2",
  measurementId: "G-SDGDQD9C4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Send the token to your server and update the UI
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      resolve(payload);
    });
  });
