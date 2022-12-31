import React, { useState, useContext, useEffect } from 'react'
import home from '../../assets/home1.jpg'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../Store/userContext'

function Home() {
    const [showReset, setShowReset] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [inputType, setInputType] = useState('password')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [Error, setError] = useState('')
    const [done,setDone]=useState('')
    const navigate = useNavigate()
    const { setUserDetails, userDetails } = useContext(UserContext)
    console.log(userDetails);
    const userId=userDetails._id
    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (!newPassword) {
            setError("Password is required");
        } else if (newPassword.length < 4) {
            setError("Password must be atleast 4 characters");
        } else if (newPassword.length > 20) {
            setError("Password must be less than 20 characters");
        } else if (newPassword != confirmPassword) {
            setError("Password does not matched");
        } else {
            try {
                const response = await axios.put(`http://localhost:5000/updatePassword/${userId}`, { password: newPassword, userId: userId, oldPassword: oldPassword })
                if (response.data.error) {
                    setError(response.data.error)
                } else if(response.data){
                    setDone('Password Reset Done')
                }else{
                    setError(response.error)
                }

            } catch (error) {
               console.log(error);
            }
        }
    }




    /* -------------------------------------------------------------------------- */
    /*                                 eye button                                 */
    /* -------------------------------------------------------------------------- */

    const handleInputType = (e) => {
        e.preventDefault()
        if (inputType === "password") {
            setInputType("text")
            return;
        }
        setInputType("password")
    }

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.removeItem('user')
        localStorage.removeItem('usertoken')
        setUserDetails('')
        navigate('/')
       
    }

    return (
        <div >
            <img src={home} className='w-full overflow-y-hidden absolute ' alt='home' />
           

            <div className='relative'>
                <h1 className=' text-5xl text-white p-2'>Welcome {userDetails.username}
                <button  className='text-xl absolute p-2 ml-96 bg-white shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-teal-400 font-semibold rounded-lg' onClick={(e)=>handleLogout(e)}>Logout</button>
                 </h1>
                <p className='text-2xl p-8'>Click here to reset your password</p>
                <button className='px-2 my-5 py-2 bg-teal-400 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={(e) => setShowReset(!showReset)}>Click here</button>
                {showReset &&
                    <div>
                        <form className='max-w-[500px] w-full h-max mx-auto rounded-lg p-8 px-8 '>
                        {Error&& <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{Error}</div>}
                        {done&& <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">{done}</div>}

                            <div className='flex flex-col text-gray-400 py-2'>
                                <label className='text-gray-400 text-bold'>Enter Current Password</label>
                                <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-teal-50 hover:border-teal-500' type={inputType} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                                <button className="absolute right-4" onClick={handleInputType}>
                                    {inputType === "password" ? <HiOutlineEyeOff className='relative mr-[550px] mt-12 text-black' /> : <HiOutlineEye className='relative text-black mr-[550px] mt-12' />}
                                </button>
                            </div>
                            <div className='flex flex-col text-gray-400 py-2'>
                                <label className=''>Enter New Password</label>
                                <input className='p-2 rounded-lg  mt-2  border border-black hover:bg-slate-100 hover:border-teal-500' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                            </div>
                            <div className='flex flex-col text-gray-400 py-2'>
                                <label className='text-gray-400 text-bold'>Confirm  New Password</label>
                                <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-teal-50 hover:border-teal-500' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>
                            <button className='px-2 my-5 py-2 bg-teal-400 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={(e) => handleResetPassword(e)}>Reset Password</button>
                          
                        </form>
                    </div>
                }
            </div>
        
        </div>
    )
}

export default Home
