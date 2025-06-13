import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Home = () => {
 
  const [user,setUser] = useState(null);
  const [dropDown,setDropDown] = useState(false)
  const [oldPass,setOldPass] = useState("")
  const [newPass,setNewPass] = useState("")
  //  const [error,setError] = useState("")
   const navigate = useNavigate();
  useEffect(()=> {
   const handleUser = async () => {
      try {
        const token = localStorage.getItem("access_token")
        const response = await axios.get("https://django-basic-authentication.onrender.com/api/profile/",{
         headers : {
          Authorization : `Bearer ${token}`
         }
        })
        setUser(response.data);
        console.log(response);
        
         
      }
      catch(error) {
          console.log(error);
          //  setError("Failed to fetch name");
      }
   }
   handleUser();
  },[])
  const handleChangePass = async () => {
       const token = localStorage.getItem("access_token");

       try {
           await axios.post("https://django-basic-authentication.onrender.com/api/change-password/",{
          old_password :oldPass ,  new_password : newPass
           }, {
            headers : {
          Authorization : `Bearer ${token}`
         }
           })
           alert("Password changed successfully");
           setNewPass("")
       }
       catch(error) {
          alert("Failed to change password")
       }
     

  }
  const handleLogout =async () => {
      
    const response =   await axios.post("https://django-basic-authentication.onrender.com/api/logout/")
     localStorage.removeItem("token");
      setUser(null)
      navigate("/Login")
      alert(response.data.message)
    console.log(response.data.message);
    
     }
  console.log(user);
  
  return (
    <div className='p-0 m-0'>
      <nav className='flex justify-between items-center p-4 bg-gray-900 text-gray-100'>
       <div className='text-2xl font-semibold'>
           My Web
       </div>
       <div className='relative'>
          {
            user ? (
              <div 
              onClick={() => setDropDown((prev) => !prev)}
              className='flex items-center space-x-2 p-2 rounded-md bg-gray-800 cursor-pointer hover:bg-gray-700 transition'
              >
              <span>{user.username}</span>
               <svg viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5 ml-1'>
                <path d='M5 715 5 5-5' />
               </svg>
              </div>
            ) : (
              <div className='flex space-x-4'>
                   <button onClick={()=> {
                    navigate("/Login")
                   }} className='px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700'>
                     Login
                   </button>
                   <button onClick={() => {
                    navigate("/SignUp")
                   }} className='px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700'>
                     SignUp
                   </button>
                
              </div>
            )
          }
           {
            dropDown && user && (
              <div className='absolute right-0 mt-2 w-48 p-4 bg-gray-800 rounded-md shadow-lg'>
               <p className='mb-2'><strong>Username : </strong>{user.username}</p>
               <p className='mb-2'><strong>Email : </strong>{user.email}</p>
              
              <input type="password" 
                 placeholder='Old Password'
                 value={oldPass}
                 className="mb-2 w-full p-1 rounded-md text-black"
                 onChange={(e) => {
                  setOldPass(e.target.value)
                  
                 }}
               />
               <input type="password" 
                 placeholder='New Password'
                 value={newPass}
                 className="mb-2 w-full p-1 rounded-md text-black"
                 onChange={(e) => {
                  setNewPass(e.target.value)
                  
                 }}
               />
               <button onClick={handleChangePass} className='block w-full text-center px-3 py-1 mb-2 rounded-md bg-gray-700'>
                 Change Password
               </button>
               <button onClick={handleLogout} className='block w-full text-center px-3 py-1 mb-2 rounded-md bg-gray-700'>
                 Logout
               </button>
              </div>
            )
           }
       </div>
      </nav>
      
      
    </div>
  )
}

export default Home
