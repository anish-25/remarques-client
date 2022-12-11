import React, { useEffect } from 'react'
import { useState } from 'react'
import Spinner from '../common-components/Spinner'

const loaderHoc = (Component) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
   setLoading(true)
   setTimeout(() => {
    setLoading(false)
   }, 1300);
    }, [])

  return (
    loading?<Spinner/>:<Component/>
  )
}

export default loaderHoc