import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getFirestore(app);

// Get a reference to the movies collection
const querySnapshot = await getDocs(collection(db, "movies"));

const refreshMovies = () => {
  const movies: any[] = [];
  querySnapshot.forEach((doc: { data: () => any; id: any }) => {
    movies.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return movies;
};

export { db, querySnapshot, refreshMovies };

export default app;
