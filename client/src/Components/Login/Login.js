import React from 'react'
import logo from '../../assets/logo.png'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import login from '../../assets/login.webp'
import axios from 'axios'
import { UserContext } from '../../Store/userContext'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const {setUserDetails, userDetails}=useContext(UserContext)
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!email) {
                setErrorMessage("Email is required");
            } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                setErrorMessage("Enter a valid email");
            } else if (!password) {
                setErrorMessage("Password is required");
            } else if (password.length < 4) {
                setErrorMessage("Password must be atleast 4 characters");
            } else if (password.length > 20) {
                setErrorMessage("Password must be less than 20 characters");
            } else {
                const { data } = await axios.post('http://localhost:5000/login', {
                    email: email,
                    password: password
                });
              
                if (data) {
                    if (data?.user) {
                        console.log(data);
                        localStorage.setItem('user', JSON.stringify(data.user))
                        localStorage.setItem('usertoken',(data.token))
                        setUserDetails(data.user)
                        navigate("/home");

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
        <div class="flex flex-col md:flex-row">
            <div class="h-32 md:h-auto md:w-1/2">
                <img class="object-cover w-full h-full" src={login}
                    alt="img" />
            </div>
            <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div class="w-full">
                    <div className="flex justify-center">
                        <img alt="" className="h-14 w-14"
                            src={logo} />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 mt-5">Don't have an account yet?
                        <Link to='/signup' className="font-medium text-teal-600 hover:text-teal-500">
                            Signup
                        </Link>
                    </p>
                    <form className='max-w-[400px] w-full h-max mx-auto rounded-lg p-8 px-8 ' onSubmit={handleSubmit}>
                        {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}

                        <div className='flex flex-col text-gray-400 py-2'>
                            <label className='text-gray-400 text-bold'>Email</label>
                            <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-teal-50 hover:border-teal-500' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className='flex flex-col text-gray-400 py-2'>
                            <label className=''>Password</label>
                            <input className='p-2 rounded-lg  mt-2  border border-black hover:bg-teal-50 hover:border-teal-500' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <button className='w-full my-5 py-2 bg-teal-400 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Login</button>
                    </form>
                        <Link to='/otp' className="font-medium text-teal-600 hover:text-teal-500">
                    <p className="mt-2 text-center text-sm text-gray-600 mt-5">Login with OTP
               
                    </p>
                        </Link>
                    <p className="mt-2 text-center text-sm text-gray-600 mt-5">Forgot Password?
                        <Link to='/forgot' className="font-medium text-teal-600 hover:text-teal-500">
                            Click here
                        </Link>
                    </p>
              
                </div>
              
            </div>
        </div>
    )
}

export default Login
