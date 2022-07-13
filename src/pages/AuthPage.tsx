import React from 'react'
import {useInput} from "../hook/input";
import {useAppDispatch} from "../hook/redux";
import {login, register} from "../store/actions/authActions";
import {useNavigate} from "react-router-dom";

export function AuthPage() {
    const username = useInput('')
    const password = useInput('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const loginHandler = () => {
        if (isFormValid()) {
            dispatch(login({username: username.value, password: password.value})).then(() => {
                navigate('/')
            })
        } else {
            alert('Invalid form, please change data')
        }
    }

    const isFormValid = () => {
        return password.value && username.value
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        if (isFormValid()) {
            dispatch(register({username: username.value, password: password.value})).then(() => {
                navigate('/')
            })
        } else {
            alert('Invalid form, please change data')
        }
    }

    return (
        <form
            className='container mx-auto max-w-[500px]'
            onSubmit={submitHandler}
        >
            <div className='mb-2'>
                <label htmlFor='username' className='block'>Username</label>
                <input type='text' {...username} id='username' className='border py-1 px-2 w-full'/>
            </div>

            <div>
                <label htmlFor='password' className='block'>Password</label>
                <input type='password' {...password} id='password' className='border py-1 px-2 w-full'/>
            </div>

            <button className='py-2 px-4 bg-blue-700 border text-white' type='submit'>Register</button>
            <button className='py-2 px-4 bg-green-700 border text-white' type='button' onClick={loginHandler}>Login</button>
        </form>
    )
}