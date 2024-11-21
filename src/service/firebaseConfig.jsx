
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsriPoaOE0h7VV2DbLOP1p7JTYSu_CrDA",
  authDomain: "materials-management-a7205.firebaseapp.com",
  projectId: "materials-management-a7205",
  storageBucket: "materials-management-a7205.firebasestorage.app",
  messagingSenderId: "953625730612",
  appId: "1:953625730612:web:883eabf049821460e5b461",
  measurementId: "G-VMECZG1L9X"
};

export const app = initializeApp(firebaseConfig);
export const db=getFirestore();