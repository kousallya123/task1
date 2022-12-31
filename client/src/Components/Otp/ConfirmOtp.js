import React, { useContext, useState } from 'react'
import logo from '../../assets/logo.png'
import forgot from '../../assets/forgot.webp'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../Store/userContext'

function ConfirmOtp() {
  const phone=useParams().phone
  const navigate = useNavigate() 
    const [Otp,SetOtp]=useState('')
    const [message,setMessage]=useState('')
    const [errorMessage,setErrorMessage]=useState('')
    const {setUserDetails, userDetails}=useContext(UserContext)

    const confirmOTP=async(e)=>{
        e.preventDefault()
        try {    
        const res=await axios.post('http://localhost:5000/confirmOtp',{Otp,phone})
        if(res){
          setMessage('otp verification Successfull')
                        localStorage.setItem('user', JSON.stringify(res.data?.user))
                        setUserDetails(res.data?.user)
                        navigate("/home");
        }else{
          setErrorMessage('Enter a valid OTP')
        }
          
        } catch (error) {
          console.log(error);
          setErrorMessage(error.message)
        }
      
      }
  return (
    <div class="flex flex-col md:flex-row">
    <div class="h-32 md:h-auto md:w-1/2">
        <img class="object-cover w-full h-full" 
        src={forgot}
            alt="img" />
    </div>
    <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div class="w-full">
   <div className="flex justify-center">
     <img alt=""className="h-14 w-14"
         src={logo}
        />
   </div>
   <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Enter your OTP
   </h2>
  <form className='max-w-[400px] w-full h-max mx-auto rounded-lg p-8 px-8 ' >
  {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
  {message && <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">Check your mail</div>}
       <div className='flex flex-col text-gray-400 py-2'>
           <label className='text-gray-400 text-bold'>Type Your OTP</label>
           <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-teal-50 hover:border-teal-500' type="text"
           value={Otp} onChange={(e)=>SetOtp(e.target.value)}/>
       </div>
       <button className='w-full my-5 py-2 bg-teal-400 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={confirmOTP}>VERIFY</button>  
   </form>
</div>

            
        </div>
    </div>
  )
}

export default ConfirmOtp
