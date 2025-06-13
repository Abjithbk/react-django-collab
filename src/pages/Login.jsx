import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("");
  const [error,setError] = useState("")
  const navigate = useNavigate();
   
    const handleLogin = async (e)=> {
        e.preventDefault();
         try {
       const response = await axios.post("https://django-basic-authentication.onrender.com/api/login/",{
          username:username,password:password
         })
         console.log(response.data.access);
         localStorage.setItem("access_token",response.data.access);
         navigate("/Home")
         }
         catch(error) {
          setError("Invalid email and password try again")
         }
    }
  return (
    <div>
       <div className='flex justify-center items-center min-h-screen bg-gray-100'>
         <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-md'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>Login</h2>
        {
          error && (<p className='text-red-500'>{error}</p>)
        }
      <form onSubmit={handleLogin} action="" className='space-y-4'>
             
             <div>
              <label className='block mb-1 text-sm font-medium text-gray-700' htmlFor="">UserName</label>
              <input value={username} onChange={(e)=> {
                setUserName(e.target.value);
              }} type="text" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' name="username" id="username" />
             </div>
             <div>
              <label className='block mb-1 text-sm font-medium text-gray-700' htmlFor="">Password</label>
              <input value={password} onChange={(e) => {
                setPassword(e.target.value);
              }} type="Password" className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' name="password" id="password" />
             </div>
             <button className='w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700'>
                 Login
             </button>
      </form>
      <p onClick={()=> {
        navigate("/ForgotPass")
      }} className='text-sm text-center hover:text-blue-500 cursor-pointer'>Forgot Password</p>
      <p className='text-sm text-center text-gray-600'>
         Don't have an account ? <span
            onClick={() => navigate('/SignUp')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            SignUp
          </span>
      </p>
         </div>
    </div>
    </div>
  )
}

export default Login