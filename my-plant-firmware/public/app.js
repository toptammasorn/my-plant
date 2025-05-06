// Complete Project Details
// ESP32: https://RandomNerdTutorials.com/esp32-firebase-web-app/
// ESP8266: https://RandomNerdTutorials.com/esp8266-nodemcu-firebase-web-app/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkIxhR6DGcRtrvAyGj6oK9F-rnaEKaU9Y",
  authDomain: "my-plant-firebase.firebaseapp.com",
  databaseURL:
    "https://my-plant-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-plant-firebase",
  storageBucket: "my-plant-firebase.firebasestorage.app",
  messagingSenderId: "466336020550",
  appId: "1:466336020550:web:185e47907b2243c4a93247",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

// Database Paths
const dataFloatPath = "test/float";
const dataIntPath = "test/int";
const dataStringPath = "test/string";

// Get database references
const databaseFloatRef = ref(database, dataFloatPath);
const databaseIntRef = ref(database, dataIntPath);
const databaseStringRef = ref(database, dataStringPath);

// Variables to save database current values
let floatReading;
let intReading;
let stringReading;

// Attach listeners
onValue(databaseFloatRef, (snapshot) => {
  floatReading = snapshot.val();
  console.log("Float reading: " + floatReading);
  document.getElementById("reading-float").innerHTML = floatReading;
});

onValue(databaseIntRef, (snapshot) => {
  intReading = snapshot.val();
  console.log("Int reading: " + intReading);
  document.getElementById("reading-int").innerHTML = intReading;
});

onValue(databaseStringRef, (snapshot) => {
  stringReading = snapshot.val();
  console.log("String reading: " + stringReading);
  document.getElementById("reading-string").innerHTML = stringReading;
});
