import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const ForgotPass = () => {
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [message,setMessage] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()
     const handleForgotPass = async (e) => {
        e.preventDefault();
        try {
         const response = await axios.post("https://django-basic-authentication.onrender.com/api/forgot-password/",{
           username: userName,email:email,password:newPassword
         })
        //  console.log(response);
        //  console.log(response.data.message);
         setMessage(response.data.message)
        setError("")
        setTimeout(()=> {
           navigate("/Login")
        },2000)
        }
        catch(error) {
           setError("Incorrect Email and Password")
        }
     }  

  return (
    <div className='max-w-md mx-auto p-6 mt-10 bg-gray-100 rounded-lg shadow-md'>
       <h2 className='text-2xl font-semibold mb-6 text-center'>Forgot Password</h2>
       <form onSubmit={handleForgotPass} className='flex flex-col gap-4'>
        <div>
            <label className='block font-semibold mb-1' htmlFor="username">UserName</label>
            <input value={userName} onChange={(e)=> {
                setUserName(e.target.value);
            }} type="text" id='username' name='username' placeholder='Enter your username' className='w-full rounded-md p-2' />
        </div>
        <div>
            <label className='block font-semibold mb-1' htmlFor="Email">Email</label>
            <input value={email} onChange={(e) => {
                setEmail(e.target.value);
            }} type="Email" id='Email' name='Email' placeholder='Enter your Email' className='w-full rounded-md p-2' />
        </div>
        <div>
            <label className='block font-semibold mb-1' htmlFor="Password">New Password</label>
            <input value={newPassword} onChange={(e) => {
                setNewPassword(e.target.value);
            }}  type="password" id='password' name='password' placeholder='Enter your username' className='w-full rounded-md p-2' />
        </div>
        <button className='bg-blue-500 text-gray-100 font-semibold p-2 rounded-md hover:bg-blue-700'>Reset Password</button>
       </form>
       {message && <p className='text-green-500 mt-4 '>{message}</p> }
       {error && <p className='text-red-500 mt-4'> {error} </p> }
    </div>
  )
}

export default ForgotPass