import { collection, getDocs, getFirestore } from "firebase/firestore"

export const LoadNotes = async (uid) => {

    const db = getFirestore();
    
    const querySnapshot = await getDocs(collection(db, `${uid}/journal/notes`));
    const notes = [];

    querySnapshot.forEach((doc) => {
        notes.push({
            id: doc.id,
            ...doc.data()
        });
    });

    return notes;

}