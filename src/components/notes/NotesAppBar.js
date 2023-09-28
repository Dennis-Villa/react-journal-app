
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadingPicture } from '../../actions/notes';
import { DateTime } from 'luxon';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const {active} = useSelector( state => state.notes );

  const noteDate = DateTime.fromMillis(active.date).setLocale('en');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if( !!file ){
      dispatch( startUploadingPicture(file) );
    }
  };

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleSave = () => {
    dispatch( startSaveNote(active) );
  };

  return (
    <div className='notes__appbar'>
        <span>{noteDate.toRelativeCalendar()}</span>

        <input 
          id='fileSelector'
          type='file'
          name='file'
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <div>
            <button 
              className='btn'
              onClick={ handlePictureClick }
            >
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
