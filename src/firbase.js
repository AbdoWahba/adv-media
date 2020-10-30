// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyCeQ_y2L-OglIYP3c89l9Q0oYx_a7SNyhQ',
  authDomain: 'advmedia-atw.firebaseapp.com',
  databaseURL: 'https://advmedia-atw.firebaseio.com',
  projectId: 'advmedia-atw',
  storageBucket: 'advmedia-atw.appspot.com',
  messagingSenderId: '757747673095',
  appId: '1:757747673095:web:5a3a55405d3675ef1962a2',
  measurementId: 'G-L8GZZJYVLC',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
