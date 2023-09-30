
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { JournalEntries } from './JournalEntries';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { name } = useSelector( state => state.auth );
    const { loading } = useSelector( state => state.ui );

    const handleLogout = () => {
        dispatch(
            startLogout()
        );
        navigate( '/auth/login', {
            replace: true
        });
    };

    const handleAddEntry = () => {
        dispatch( startNewNote() );
    };

    return (
        <aside 
            className='journal__sidebar animate__animated animate__slideInLeft animate__faster'
        >
            
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5'>
                    <FontAwesomeIcon icon={regular("moon")} />
                    <span> { name }</span>
                </h3>

                <button 
                    className='btn'
                    onClick={handleLogout}
                >
                    Logout
                </button>
        
            </div>

            <div 
                className='journal__new-entry'
                onClick={handleAddEntry}
            >
                <FontAwesomeIcon icon={regular("calendar-plus")} size="4x" />
                <p className='mt-1'>
                    New entry
                </p>
            </div>
            
            {
                !loading
                    && <JournalEntries />
            }

        </aside>
    );
}
