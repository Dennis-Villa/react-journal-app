
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { types } from "../types/types";
import { LoadNotes } from "../helpers/loadNotes";
import { finishLoading, startLoading } from "./ui";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const db = getFirestore();

        try {
            const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

            dispatch( activeNote( docRef.id, newNote ) );
          } catch (e) {
            console.error("Error adding document: ", e);
        }

    };
};

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async (dispatch) => {
        dispatch(
            startLoading()
        );

        const notes = await LoadNotes( uid );

        dispatch( setNotes(notes) );

        dispatch(
            finishLoading()
        );
    }
};

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});