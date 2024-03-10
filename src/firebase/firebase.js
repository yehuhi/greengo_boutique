
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBkCMyxa52v-3mn2d-8rjxwEJ9a7BV8Lpw",
  authDomain: "greengo-boutique.firebaseapp.com",
  projectId: "greengo-boutique",
  storageBucket: "greengo-boutique.appspot.com",
  messagingSenderId: "940622745692",
  appId: "1:940622745692:web:c46fc36bd8d9c605751699"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };