import React from 'react'
import Spinner from './Spinner'

const Button = ({
    buttonText,
    className,
    isLoading,
    disabled,

}) => {
  return (
    <button className={`bg-primary w-[129px] h-[38px] md:w-[135px] md:h-[41px] text-base opacity-70 hover:opacity-100 transition-all duration-300 text-white rounded-md font-semibold tracking-[2px] disabled:opacity-50 ${className}`} disabled={isLoading || disabled}>
      {isLoading?<Spinner/>:buttonText}</button>
  )
}

export default Button