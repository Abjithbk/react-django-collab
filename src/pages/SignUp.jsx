import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const SignUp = () => {
  const [username,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate =useNavigate()
  const handleSubmit = async (e) => {
     e.preventDefault();
    try {
      await axios.post("https://django-basic-authentication.onrender.com/api/register/",{
        username:username,email:email,password:password
       });
     navigate("/Login")
     
    } catch(error) {
      console.log(error);
      
    }
  }
  return (
    <div  className='flex justify-center items-center min-h-screen bg-gray-100'>
         <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-md'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>SignUp</h2>
      <form onSubmit={handleSubmit} action="" className='space-y-4'>
             <div>
              <label className='block mb-1 text-sm font-medium text-gray-700' htmlFor="">UserName</label>
              <input value={username} onChange={(e) => {
                setUserName(e.target.value)
              }}  id="username" name="username" type="text" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' />
             </div>
             <div>
              <label className='block mb-1 text-sm font-medium text-gray-700' htmlFor="">Email</label>
              <input value={email} onChange={(e) => {
                setEmail(e.target.value)
              }} id="email" name= "email" type="Email" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' />
             </div>
             <div>
              <label className='block mb-1 text-sm font-medium text-gray-700' htmlFor="">Password</label>
              <input value={password} onChange={(e)=> {
                setPassword(e.target.value)
              }} id="password" name="password" type="Password" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' />
             </div>
             <button className='w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700'>
                 SignUp
             </button>
      </form>
      <p className='text-sm text-center text-gray-600'>
         already have an account ? <span
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </span>
         </p>
         </div>
    </div>
  )
}

export default SignUp