import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDiFzbAvu-f2P4Kxl8kluw1kW1QgRvYJdw",
  authDomain: "filer-1fbbe.firebaseapp.com",
  projectId: "filer-1fbbe",
  storageBucket: "filer-1fbbe.appspot.com",
  messagingSenderId: "370916335142",
  appId: "1:370916335142:web:7a93eb4fe55108940b50e7",
  measurementId: "G-7575DK369D"
};

  const fire = firebase.initializeApp(firebaseConfig)
  export default fire