import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const {
  API_KEY,
  FIREBASE_APIKEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGE_SENDER,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY || FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app: any;
let db: any;

const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    return app;
  } catch (error) {
    console.error(`app not initialized.`);
  }
};

const uploadProcessedData = async () => {
  const dataToUpload = {
    key1: "test",
    key2: 123,
    key3: new Date(),
  };

  try {
    const document = doc(db, "receipts", "some-testing-unique-id");
    let dataUpdated = await setDoc(document, dataToUpload);
    return dataUpdated;
  } catch (error) {
    console.error(`error setting data to DB.`);
  }
};

const getFirebaseApp = () => app;

export { initializeFirebaseApp, getFirebaseApp, uploadProcessedData };
