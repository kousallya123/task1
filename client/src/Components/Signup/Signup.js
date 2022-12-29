import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import signup from '../../assets/signup.webp'
import axios from 'axios';

function Signup() {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [confirm, SetConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleConfirm = (e) => {
        SetConfirm(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!name) {
                setErrorMessage("Name is required");
            } else if (name.length < 3) {
                setErrorMessage("Name must be atleast 3 characters");
            } else if (!name.match(/^[A-Za-z][A-Za-z ]*$/)) {
                setErrorMessage("Enter a valid name");
            } else if (!email) {
                setErrorMessage("Email is required");
            } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                setErrorMessage("Enter a valid email");
            } else if (!password) {
                setErrorMessage("Password is required");
            } else if (password.length < 4) {
                setErrorMessage("Password must be atleast 4 characters");
            } else if (password.length > 20) {
                setErrorMessage("Password must be less than 20 characters");
            } else if (password != confirm) {
                setErrorMessage("Password does not matched");
            } else {
                const { data } = await axios.post(`http://localhost:5000/register`, {
                    username: name,
                    email: email,
                    password: password
                })
                if (data) {
                    if (data.user) {
                       navigate('/')
                    } else {
                        setErrorMessage(data.message)
                    }
                } else {
                    setErrorMessage('Something went wrong')
                }

            }
            
        } catch (error) {
          console.log(error);  
        }

    }
  return (
    <div>
                <div class="flex flex-col md:flex-row">
                    
                    <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div class="w-full">
                            <div className="flex justify-center">
                                <img alt="" className="h-14 w-14"
                                    src={logo}/>
                            </div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Signup to create an account
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600 mt-5">Already have an account?
                                <Link to='/' className="font-medium text-teal-600 hover:text-teal-500">
                                    Login
                                </Link>
                            </p>
                            <form className='max-w-[500px] w-full h-max mx-auto rounded-lg p-8 px-8 ' onSubmit={handleSubmit}>
                                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-gray-400 text-bold'>Username</label>
                                    <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-teal-50 hover:border-teal-500' type="text" value={name}
                                        onChange={(e) => SetName(e.target.value)} />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-gray-400 text-bold'>Email</label>
                                    <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-teal-50 hover:border-teal-500' type="text" value={email}
                                        onChange={(e) => SetEmail(e.target.value)} />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className=''>Password</label>
                                    <input className='p-2 rounded-lg  mt-2  border border-black hover:bg-slate-100 hover:border-teal-500' type="password" value={password}
                                        onChange={(e) => SetPassword(e.target.value)} />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-gray-400 text-bold'>Confirm password</label>
                                    <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-teal-50 hover:border-teal-500' type="password" value={confirm}
                                        onChange={handleConfirm} />
                                </div>

                                <button className='w-full my-5 py-2 bg-teal-400 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Signup</button>

                            </form>
                        </div>


                    </div>
                    <div class="h-32 md:h-auto md:w-1/2">
                        <img class="object-cover w-full h-full" src={signup}
                            alt="img" />
                    </div>
                </div>
            </div>
  )
}

export default Signup
