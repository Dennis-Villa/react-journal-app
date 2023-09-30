
import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, removeActive, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );

    const [ formValues, handleInputChange, reset ] = useForm( active );
    const { title, body } = formValues;

    const activeId = useRef( formValues.id );
    
    useEffect(() => {
    
        if( (active.id !== activeId.current) ){
            reset(active);
            activeId.current = active.id;
        }
    
    }, [active, reset, dispatch]);

    useEffect(() => {

            dispatch( activeNote( activeId.current, {...formValues} ) );

        return () => {
            dispatch( removeActive() );
        };
        
    }, [activeId, formValues, dispatch]);
    
    const handleDelete = () => {
        dispatch( startDeleting( activeId.current, title ) );
    };

    return (
        <div className='notes__main-content animate__animated animate__fadeIn animate__faster'>

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
                    !!active.url &&
                    <div className='notes__image'>
                        <img 
                            src={active.url}
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
