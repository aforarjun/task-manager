import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export default async function userSignOut() {
    let result = null, error = null;

    try {
        await signOut(auth);
        document.cookie = `token=; path=/;`;
        console.log("User signed out successfully");
    } catch (e) {
        error = e;
    }

    return { result, error };
}