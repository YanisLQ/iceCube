import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBAO7d0vFXinGemqQydVIR2_p456C-0eQU",
  authDomain: "icecube-5a2df.firebaseapp.com",
  projectId: "icecube-5a2df",
  storageBucket: "icecube-5a2df.appspot.com",
  messagingSenderId: "262970840912",
  appId: "1:262970840912:web:3e3b7c7376a5c68fc07e55",
  measurementId: "G-NS176GYGWT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };