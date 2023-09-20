// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCYg_L4LIBSnMymIQke0OrRwWotT-CVZ0g',
  authDomain: 'ind-hackz-tyranno.firebaseapp.com',
  projectId: 'ind-hackz-tyranno',
  storageBucket: 'ind-hackz-tyranno.appspot.com',
  messagingSenderId: '368167502185',
  appId: '1:368167502185:web:c88d735b65747a015bbdf8',
  measurementId: 'G-90JTSYMKR4',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
