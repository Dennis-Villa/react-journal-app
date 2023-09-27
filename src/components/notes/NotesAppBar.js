
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote } from '../../actions/notes';
import { DateTime } from 'luxon';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const {active} = useSelector( state => state.notes );

  const noteDate = DateTime.fromMillis(active.date).setLocale('en');

  const handleSave = () => {
    dispatch( startSaveNote(active) );
  };

  return (
    <div className='notes__appbar'>
        <span>{noteDate.toRelativeCalendar()}</span>

        <div>
            <button className='btn'>
                Picture
            </button>

            <button 
              className='btn'
              onClick={handleSave}
            >
                Save
            </button>
        </div>
    </div>
  );
}
