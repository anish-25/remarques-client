import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const Homepage = () => {
  const {auth} = useAuth() 
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
        Welcome {auth?.name}
        </div>
  )
}

export default Homepage