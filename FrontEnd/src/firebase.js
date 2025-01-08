import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXMuQiihB_pXnH9VhTGbBOzB4TtTEwAHA",
  authDomain: "bewakoofauth.firebaseapp.com",
  projectId: "bewakoofauth",
  storageBucket: "bewakoofauth.firebasestorage.app",
  messagingSenderId: "974604564109",
  appId: "1:974604564109:web:c34c59d21b15c16708d4c4",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
