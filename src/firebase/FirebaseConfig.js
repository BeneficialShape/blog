import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // we are using firestore
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWLTtIB5XxiXPkRWxWcFIpFD22agzrQbM",
  authDomain: "blog-2dd23.firebaseapp.com",
  projectId: "blog-2dd23",
  storageBucket: "blog-2dd23.appspot.com",
  messagingSenderId: "735650540696",
  appId: "1:735650540696:web:2d16934c38c7520235f4ed",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app); // accessing database
export const auth = getAuth(app);
export default app;
