import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBficxb22byFjptwQMPtCSfeP6MH8nOahg',
  authDomain: 'teacher-2078e.firebaseapp.com',
  databaseURL:
    'https://teacher-2078e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'teacher-2078e',
  storageBucket: 'teacher-2078e.appspot.com',
  messagingSenderId: '108413253310',
  appId: '1:108413253310:web:2b9fb939f50e6d8f9550ef',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
