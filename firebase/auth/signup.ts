import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";


export default async function signUp(email: string, password: string, username: string) {
    let result = null, error = null;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const userLoginpCredential = await signInWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser!, { displayName: username });

        const { user } = userLoginpCredential;

        // get the token and set it to the cookies
        const token = await user.getIdToken();
        const tokenResult = await user.getIdTokenResult();
        document.cookie = `token=${token}; path=/;`;

        result = { user, token, tokenResult }
    } catch (e) {
        error = e;
    }

    return { result, error };
}