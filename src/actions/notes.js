
import { addDoc, collection, doc, getFirestore, runTransaction } from "firebase/firestore";
import { types } from "../types/types";
import { LoadNotes } from "../helpers/loadNotes";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

// react-journal

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        Swal.fire({
            title: 'Adding New Note...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const db = getFirestore();

        try {
            const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

            dispatch( addNew({id: docRef.id, ...newNote}) );
            dispatch( activeNote( docRef.id, newNote ) );

          } catch (e) {
            console.error("Error adding document: ", e);
        }

        Swal.close();

    };
};

export const addNew = (note) => ({
    type: types.notesAddNew,
    payload: note
});

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

export const startSaveNote = ( note ) => {
    return async (dispatch, getState) => {

        const {uid} = getState().auth;

        if( !note.url ){
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const db = getFirestore();

        const sfDocRef = doc(db, `${uid}/journal/notes/${note.id}`);


        try {
            await runTransaction(db, async (transaction) => {
              const sfDoc = await transaction.get(sfDocRef);
              if (!sfDoc.exists()) {
                throw Error("Document does not exist!");
              }
          
              transaction.update(sfDocRef, noteToFirestore);
              
              dispatch( refreshNote(note.id, noteToFirestore) );
              dispatch( activeNote(note.id, noteToFirestore) );
              Swal.fire('Saved', note.title, 'success');
            });
          } catch (e) {
            console.log("Transaction failed: ", e);
          }

    };
};

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
});

export const startUploadingPicture = (file) => {
    return async (dispatch, getState) => {
        const { active } = getState().notes;
        
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        const newUrlNote = {
            ...active,
            url: fileUrl
        };
        console.log(newUrlNote);

        dispatch( startSaveNote( newUrlNote ) );

        Swal.close();

    };
};

export const startDeleting = (id, title = '') => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        const db = getFirestore();

        const sfDocRef = doc(db, `${uid}/journal/notes/${id}`);


        try {
            await runTransaction(db, async (transaction) => {
              const sfDoc = await transaction.get(sfDocRef);
              if (!sfDoc.exists()) {
                throw Error("Document does not exist!");
              }
          
              transaction.delete(sfDocRef);
              
              dispatch( deleteNote(id) );
              Swal.fire('Deleted', title, 'success');
            });
          } catch (e) {
            console.log("Transaction failed: ", e);
          }
    };
};

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});
