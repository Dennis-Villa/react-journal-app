
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const [checking, setChecking] = useState(true);
    const dispatch = useDispatch();

    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged( auth, async (user) => {  

            if( user?.uid ){
                const { uid, displayName } = user;

                dispatch( login(uid, displayName) );

                dispatch( startLoadingNotes(uid) );
            }

            setChecking(false);

        })
    
    }, [auth, dispatch])
    
    if( checking ){
        return(
            <div className='auth__main' style={{ flexDirection: 'column' }}>
                <h1>Wait...</h1>
                <FontAwesomeIcon icon={solid("rotate-right")} spin size='2x' style={{ marginTop: '10px' }}/>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth/*' element={ 
                    <PublicRoute>
                        <AuthRouter/> 
                    </PublicRoute>
                } />
                
                <Route path='/*' element={ 
                    <PrivateRoute>
                        <JournalScreen/> 
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}
