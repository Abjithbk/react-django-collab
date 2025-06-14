import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Home = () => {
  const [user,setUser] = useState(null);
  const [allUsers,setAllUsers] = useState("")
  const [dropDown,setDropDown] = useState(false)
  const [oldPass,setOldPass] = useState("")
  const [newPass,setNewPass] = useState("")
  const [newEmail,setNewEmail] = useState("");
  const [searchName,setSearchName] = useState("")
  const [searchEmail,setSearchEmail] = useState("")
  const [isSuperUser,setIsSuperUser] = useState("");
  const [isStaff,setIsStaff] = useState("");
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)
   const [error,setError] = useState("")
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
        // console.log(response);
        
         
      }
      catch(error) {
          console.log(error);
          //  setError("Failed to fetch name");
      }
   }

   handleUser();

  },[])
     const getAllUsers =async () => {
       try {
          const token = localStorage.getItem("access_token")
        const response = await axios.get("https://django-basic-authentication.onrender.com/api/userlist/", {
          headers : {
            Authorization : `Bearer ${token}`
          },
          params : {
            page,
            name : searchName,
            email:searchEmail,
            is_superuser : isSuperUser,
            is_staff : isStaff,
          }
        });
       console.log(response.data);
       setAllUsers(response.data.results)
       setTotalPage(response.data.count);

       }
       catch(error) {
        console.log(error);
        
       }
       
     
  }
  useEffect(()=> {
    getAllUsers()
  },[page])
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
   

  const handleChangeEmail = async () => {
     const token = localStorage.getItem("access_token");

     try {
       await axios.put("https://django-basic-authentication.onrender.com/api/profile/",{
        email : newEmail
       }, {
        headers : {
          Authorization : `Bearer ${token}`,
        }
       })
       alert("Email changed successfully");
       setNewEmail("");

       setUser((prev) => ({...prev,email:newEmail}))

     }
     catch(error) {
       console.log(error);
       alert("Failed to change Email")
       
     }
  }
   
     const handleAdminDashboard = async () => {
         const token = localStorage.getItem("access_token");
    
         try {
           const response = await axios.get("https://django-basic-authentication.onrender.com/api/admin-only/", {
            headers : {
              Authorization : `Bearer ${token}`
            }
           })
           console.log(response.data);
           navigate("/AdminPage",{ state : {message : response.data.message} })
           
         }
         catch(error) {
            console.log(error);
            setError("Not Authorized")
            
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
    <div className='p-0 m-0 bg-gray-200'>
      <nav className='flex justify-between items-center p-4 bg-gray-900 text-gray-100'>
       <div className='text-2xl font-semibold'>
           My Web
       </div>
      
      
      <div className='flex items-center space-x-4'>
        <button onClick={handleAdminDashboard} className='p-2  rounded  bg-gray-800 hover:bg-gray-700'>Go to Admin Dashboard</button>
         {error && <p className='text-red-500 font-bold'>{error}</p> }
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
              <div className='absolute right-0 mt-2 w-48 p-4 bg-gray-800 rounded-md shadow-lg z-50'>
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
                <input type="email" 
                 placeholder='New Email'
                 value={newEmail}
                 className="mb-2 w-full p-1 rounded-md text-black"
                 onChange={(e) => {
                  setNewEmail(e.target.value)
                 }}
               />
                <button onClick={handleChangeEmail} className='block w-full text-center px-3 py-1 mb-2 rounded-md bg-gray-700'>
                 Change Email
               </button>
            
               <button onClick={handleLogout} className='block w-full text-center px-3 py-1 mb-2 rounded-md bg-gray-700'>
                 Logout
               </button>
              </div>
            )
           }
       </div>
      </div>
      
      </nav>
       <div className='max-w-2xl mx-auto p-6'>
          <div className='flex flex-wrap gap-4 mb-4'>
            <input 
            type="text"
            placeholder='Search by Name'
            value={searchName}
            onChange={(e)=> {
              setSearchName(e.target.value)
            }}
            className='p-2 border rounded-md flex-1'
            />
            <input 
            type="email"
            placeholder='Search by Email'
            value={searchEmail}
            onChange={(e)=> {
              setSearchEmail(e.target.value)
            }}
            className='p-2 border rounded-md flex-1'
            />
           <select 
            value={isSuperUser}
            onChange={(e) => {
              setIsSuperUser(e.target.value)
            }}
            className='p-2 border rounded-md'
           >
                <option value="">Super User(All)</option>
                <option value="true">True</option>
                <option value="false">False</option>
           </select>
           <select 
            value={isStaff}
            onChange={(e) => {
              setIsStaff(e.target.value)
            }}
            className='p-2 border rounded-md'
           >     <option value="">Staff(All)</option>
                <option value="true">True</option>
                <option value="false">False</option>
           </select>
           <button onClick={getAllUsers} className='p-2 bg-blue-500 text-gray-50 font-semibold rounded-md'>
             Search
           </button>
          </div>
       </div>
           {allUsers.length > 0 && (
        <div className=' bg-white rounded-md text-black'>
          {/* <h3 className='text-lg font-semibold mb-2'>All Registered Users</h3> */}
          <ul className='mt-4 p-4'>
            {allUsers.map((u) => (
              <li className='flex justify-between items-center p-2 mb-2 bg-gray-50 rounded-md transition transform hover: translate-x-1' key={u.id}>
                <strong>Username:</strong> {u.username}<strong>Email:</strong> {u.email}
              </li>
            ))}
          </ul>
        </div>
      )}
        <div className='flex justify-center mt-4 space-x-2'>
          <button 
          onClick={() => {
            setPage(1)
          }}
          disabled ={page<=1}
          className='p-2 bg-gray-500 text-gray-50 font-semibold rounded-md disabled:opacity-50'
          >
             First
          </button>
          <button 
          onClick={() => {
            setPage((prev) => Math.max(1,prev-1))
          }}
          disabled ={page<=1}
          className='p-2 bg-gray-500 text-gray-50 font-semibold rounded-md disabled:opacity-50'
          >
             Previous
          </button>
          <span>Page {page} of {totalPage}</span>
          <button
          onClick={() => {
            setPage((prev) => Math.min(totalPage,prev+1))
          }} 
          disabled = {page >= totalPage}
          className='p-2 bg-gray-500 text-gray-50 font-semibold rounded-md disabled:opacity-50'
          >
             Next
          </button>
          <button 
          onClick={() => {
            setPage(totalPage)
          }}
          disabled = {page >= totalPage}
          className='p-2 bg-gray-500 text-gray-50 font-semibold rounded-md disabled:opacity-50'
          >
             Last
          </button>

        </div>
      
    </div>
  )
}

export default Home

