import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase-config";

const provider = new GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

auth.useDeviceLanguage();

provider.setCustomParameters({
    'login_hint': 'user@example.com'
});

export {
    provider
};