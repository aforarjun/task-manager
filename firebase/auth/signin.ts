import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export default async function signIn(email: string, password: string) {
    let result = null,
        error = null;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        // get the token and set it to the cookies
        const token = await user.getIdToken();
        const tokenResult = await user.getIdTokenResult();
        document.cookie = `token=${token}; path=/;`;

        result = {
            user, token, tokenResult
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}