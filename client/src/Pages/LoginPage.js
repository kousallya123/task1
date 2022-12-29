import React, { useContext, useEffect } from 'react'
import Login from '../Components/Login/Login'
import { UserContext } from '../Store/userContext'
import { useNavigate } from 'react-router-dom'


function LoginPage() {
  const { userDetails } = useContext(UserContext)
  const navigate=useNavigate()
  useEffect(() => {
    if (userDetails) {
      navigate('/home')
    }
  }, [])
  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginPage
