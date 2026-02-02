// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth} from "firebase/auth";    

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzsDW33HffRMm3OiNCVG1Z2E8FcCPqffE",
  authDomain: "resumate-c9968.firebaseapp.com",
  projectId: "resumate-c9968",
  storageBucket: "resumate-c9968.firebasestorage.app",
  messagingSenderId: "830045302104",
  appId: "1:830045302104:web:5c04fd7a7ad06fee56892d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export default app;

export const db = getFirestore(app);