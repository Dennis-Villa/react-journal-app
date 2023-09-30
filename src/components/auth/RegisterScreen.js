
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { loading, msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password1: '',
        password2: ''
    });

    const { name, email, password1, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName( email, password1, name ) );
        }

    };

    const isFormValid = () => {

        if( name.trim().length === 0 ){
            dispatch(
                setError('Name is required')
            );
            return false;
        }
        else if( !validator.isEmail( email ) ){
            dispatch(
                setError('Email is not valid')
            );
            return false;
        }
        else if( password1.length < 5 ){
            dispatch(
                setError('Password must be at least 6 characters long')
            );
            return false;
        }
        else if( password1 !== password2 ){
            dispatch(
                setError('Passwords must match each other')
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
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={handleRegister}>

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
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />
            
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
                    name='password1'
                    className='auth__input'
                    value={password1}
                    onChange={handleInputChange}
                />

                <input 
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    className='auth__input'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-5'
                    disabled={ loading }
                >
                    Register
                </button>

                <Link to="/auth/login" className='link'>
                    Already registered?
                </Link>

            </form>
        </div>
    );
}
