import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker
// by passing in your app's Firebase config object.
const firebaseConfig = {
  apiKey: "AIzaSyC_mXiU9kzeLm83POlGJzmors3wwUngFGQ",
  authDomain: "museum-signage-37925190-100ae.firebaseapp.com",
  projectId: "museum-signage-37925190-100ae",
  storageBucket: "museum-signage-37925190-100ae.firebasestorage.app",
  messagingSenderId: "844193426951",
  appId: "1:844193426951:web:4fd8470464c09c965c84a2"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
