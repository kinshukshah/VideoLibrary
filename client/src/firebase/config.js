import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDSUGg8qaQ277sARSmTUNcLga73mH1tWTo",
  authDomain: "play-1dbde.firebaseapp.com",
  projectId: "play-1dbde",
  storageBucket: "play-1dbde.appspot.com",
  messagingSenderId: "299028996860",
  appId: "1:299028996860:web:6c68f622d13d61d23c2d79",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };