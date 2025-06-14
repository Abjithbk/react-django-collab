import React from 'react'

import { useLocation } from 'react-router-dom'
const AdminPage = () => {
    const location = useLocation();
    const message = location.state?.message
    console.log(message);
    
  return (
    <div className='font-bold text-black p-4'>
      {message && <p className='text-green-500'>{message}</p> }
    
    </div>
  )
}

export default AdminPage
