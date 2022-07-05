import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { readFileSync } from "fs"

const firebaseConfig = {
  apiKey: "AIzaSyDml6heZ2LIH-QbX_uqRNAX41dSfbm-W38",
  authDomain: "darkchat-338d3.firebaseapp.com",
  projectId: "darkchat-338d3",
  storageBucket: "darkchat-338d3.appspot.com",
  messagingSenderId: "411139723213",
  appId: "1:411139723213:web:8804a7c80825395e787e84",
  measurementId: "G-YPKV5X5375"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);

export async function signIn(username, password) {
  // login user
  let user = await signInWithEmailAndPassword(auth, username, password);
  return user;
}
/**
 * 
 * @param {*} email 
 * @param {*} username 
 * @param {*} password 
 * @returns {import("firebase/auth").User}
 */
export async function createUser(email, username, password) {
  let user = await createUserWithEmailAndPassword(auth, email, username, password);
  await updateProfile(user.user, { displayName: username }); // set username
  return user.user;
}


export {
  app,
  auth,
  db
}