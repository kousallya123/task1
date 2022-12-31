import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import forgot from '../../assets/forgot.webp'
import axios from 'axios'

function Forgot() {
    const [email,setEmail]=useState('')
    const [message,setMessage]=useState(false)
    const [errorMessage,setErrorMessage]=useState('')
    const sendLink=async(e)=>{
        e.preventDefault()
        try {    
        const res=await axios.post('http://localhost:5000/sendPasswordLink',{email:email})
        if(res.data==='Email send successfully'){
          setMessage(true)
        }else{
          setErrorMessage('Enter a valid mail')
        }
          
        } catch (error) {
          console.log(error);
          setErrorMessage(error.message)
        }
      
      }
  return (
    <div>
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
           <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Forgot Password?
           <p className='text-xs max-w-[300px] flex justify-center ml-40 p-3 text-gray-600'>We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
           </h2>
          <form className='max-w-[400px] w-full h-max mx-auto rounded-lg p-8 px-8 ' >
          {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
          {message && <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">Check your mail</div>}
               <div className='flex flex-col text-gray-400 py-2'>
                   <label className='text-gray-400 text-bold'>Enter Your Email</label>
                   <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-teal-50 hover:border-teal-500' type="text"
                   value={email} onChange={(e)=>setEmail(e.target.value)}/>
               </div>
               <button className='w-full my-5 py-2 bg-teal-400 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={sendLink}>Send Link</button>  
           </form>
        </div>

                    
                </div>
            </div>
</div>
  )
}

export default Forgot
