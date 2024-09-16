// generateToken.ts
import { auth } from "./firebaseAdmin";

export async function generateCustomToken(uid: string): Promise<string> {
  try {
    const customToken = await auth.createCustomToken(uid);
    return customToken;
  } catch (error) {
    console.error("Error creating custom token:", error);
    throw error;
  }
}
