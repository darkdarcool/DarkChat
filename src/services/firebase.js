import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { readFileSync } from "fs"
import dotenv from "dotenv"
dotenv.config();


const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
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