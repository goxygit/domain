import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const db_url = process.env.NEXT_PUBLIC_DATABASE_URL
const api_key = process.env.NEXT_PUBLIC_API_KEY
const auth_domain = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const project_id = process.env.NEXT_PUBLIC_PROJECT_ID
const storage_bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET
const messaging_sender_id = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
const publick_id = process.env.NEXT_PUBLIC_ID
console.log(db_url)
const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  databaseURL: db_url,
  projectId: project_id,
  storageBucket: storage_bucket,
  messagingSenderId: messaging_sender_id,
  appId: publick_id
};

// Initialize Firebase
//@ts-ignore
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);