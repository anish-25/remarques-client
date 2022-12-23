import React, { useEffect } from 'react'
import { useState } from 'react'
import Loader from '../common-components/Loader'
import { useAuth } from '../hooks/useAuth'

const loaderHoc = (Component) => {
    const [loading, setLoading] = useState(true)
    const {auth} = useAuth()
    useEffect(() => {
   setLoading(true)
   setTimeout(() => {
    setLoading(false)
   }, auth?.id? 1300 :500);
    }, [])

  return (
    loading?<Loader/>:<Component/>
  )
}

export default loaderHoc