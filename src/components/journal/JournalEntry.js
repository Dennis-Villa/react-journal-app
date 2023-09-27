
import { DateTime } from 'luxon';
import React from 'react';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ( {id, date, title, body, url} ) => {
    
    const dispatch = useDispatch();

    const noteDate = DateTime.fromMillis(date).setLocale('en');
    
    const handleNoteClick = () => {
        dispatch( 
            activeNote(id, {
                date, title, body, url
            }) 
        );
    };

    return (
        <div 
            className='journal__entry'
            onClick={handleNoteClick}
        >

            {
                !!url && 
                <div 
                    className='journal__entry-picture'
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`,
                    }}
                ></div>
            }

            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    {title}
                </p>
                <p className='journal__entry-content'>
                    {body}
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>{noteDate.weekdayLong}</span>
                <h4>{noteDate.day}</h4>
            </div>

        </div>
    );
}
