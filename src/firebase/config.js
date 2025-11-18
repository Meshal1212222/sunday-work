import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACk3UhHouKfGsOu3ZJfa0hqLqucumn2UQ",
  authDomain: "sunday-fb28c.firebaseapp.com",
  databaseURL: "https://sunday-fb28c-default-rtdb.firebaseio.com",
  projectId: "sunday-fb28c",
  storageBucket: "sunday-fb28c.firebasestorage.app",
  messagingSenderId: "24752239756",
  appId: "1:24752239756:web:386c2c72624eb67ba337a9",
  measurementId: "G-R50TBPQFJL"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database
export const database = getDatabase(app)

export default app
