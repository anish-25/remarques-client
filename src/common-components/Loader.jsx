import React from 'react'
import '../css/loader.css'
const Loader = ({
    height,
    width,
    border,
    className,
}) => {
    return (
        <div className="flex justify-center items-center min-h-screen min-w-full">
            <div className="loader">
                <div className={`!h-[35px] !border-6 ${className}`}></div>
                <div className={`!h-[35px] !border-6 ${className}`}></div>
                <div className={`!h-[35px] !border-6 ${className}`}></div>
                <div className={`!h-[35px] !border-6 ${className}`}></div>
            </div>
        </div>
    )
}

export default Loader