import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyBFeflcAPFIG9NpFPVvZDCjOmqENqYmZzE",
  authDomain: "proje1-a568b.firebaseapp.com",
  projectId: "proje1-a568b",
  storageBucket: "proje1-a568b.appspot.com",
  messagingSenderId: "778143860345",
  appId: "1:778143860345:web:da08e7139c8fe6b987f6a8",
  measurementId: "G-VTE3SSK1MS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export default app;
