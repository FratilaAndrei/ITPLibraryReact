// firebaseAdmin.ts
import admin from "firebase-admin";
import { API_URL, SERVICE_ACCOUNT } from "./firebase";
// import serviceAccount from "./path/to/serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT),
  databaseURL: API_URL,
});

export const auth = admin.auth();
