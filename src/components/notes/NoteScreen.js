
import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes );

    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { title, body } = formValues;

    const activeId = useRef( formValues.id);

    useEffect(() => {
        
        if( (note.id !== activeId.current) ){
            reset(note);
            activeId.current = note.id;
        }
    
    }, [note, reset]);

    useEffect(() => {

        dispatch( activeNote( activeId.current, {...formValues} ) );
        
    }, [formValues, dispatch]);
    
    const handleDelete = () => {
        dispatch( startDeleting( activeId.current, title ) );
    };

    return (
        <div className='notes__main-content'>

            <NotesAppBar/>

            <div className='notes__content'>

                <input 
                    type='text' 
                    placeholder='Some awesome title'
                    name='title'
                    className='notes__title-input'
                    autoComplete='off'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea 
                    placeholder='What happened today'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    !!note.url &&
                    <div className='notes__image'>
                        <img 
                            src={note.url}
                            alt='imagen'
                        />
                    </div>
                }

            </div>
        
            <button 
                className='btn btn-danger'
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    );
}
