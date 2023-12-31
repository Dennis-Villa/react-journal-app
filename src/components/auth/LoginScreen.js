
import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';

const imagenes = require.context('../../assets/images/');
const googleLogo = imagenes('./googleLogo.svg');

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading, msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        if( isFormValid() ){
            dispatch( startLoginEmailPassword(email, password) );
        }
    };

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    };

    const isFormValid = () => {

        if( !validator.isEmail( email ) ){
            dispatch(
                setError('Email is not valid')
            );
            return false;
        }
        else if( password.length < 5 ){
            dispatch(
                setError('Password must be at least 6 characters long')
            );
            return false;
        }

        dispatch(
            removeError()
        );
        return true;

    };

    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <h3 className='auth__title'>Login</h3>

            <form onSubmit={handleLogin}>
            
                {
                    !!msgError &&
                    (
                        <div className='auth__alert-error'>
                            {msgError}
                        </div>
                    )
                }

                <input 
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={loading}
                >
                    Login
                </button>

                <div className='auth__social-networks'>
                    <p>Login with social networks</p>

                    <div
                        className='google-btn'
                        onClick={handleGoogleLogin}
                    >
                        <div className='google-icon-wrapper'>
                            <img className='google-icon' src={googleLogo} alt='google button' />
                        </div>
                        <p className='btn-text'>
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className='link'>
                    Create new account
                </Link>

            </form>
        </div>
    );
}
