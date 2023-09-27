import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { types } from "../types/types";
import {provider} from '../firebase/auth_google_provider';
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        const auth = getAuth();

        dispatch(
            startLoading()
        );

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                // Signed in 
                const {displayName, uid} = user;

                dispatch(
                    login( uid, displayName )
                );
                dispatch(
                    finishLoading()
                );
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                dispatch(
                    finishLoading()
                );

                Swal.fire(errorCode, errorMessage, 'error');

            });

    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {

        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then(({user}) => {

            const {displayName, uid} = user;

            dispatch(
                login( uid, displayName )
            );
            
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...

            console.log(errorCode, errorMessage, email, credential);
        });

    };
};

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {

        const auth = getAuth();

        dispatch(
            startLoading()
        );

        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({user}) => {
                // Signed in 
                await updateProfile( user, { displayName: name } );

                const { displayName, uid } = user;
                
                dispatch(
                    login( uid, displayName )
                );

                dispatch(
                    finishLoading()
                );
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..

                dispatch(
                    finishLoading()
                );

                Swal.fire(errorCode, errorMessage, 'error');
            });

    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return (dispatch) => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch(
                logout()
            );
        }).catch((error) => {
        // An error happened.
        });
    };
};

export const logout = () => ({
    type: types.logout,
});
