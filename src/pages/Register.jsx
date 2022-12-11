import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common-components/Button'
import Header from '../common-components/Header'
import Input from '../common-components/Input'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    emailError : false,
    passwordError : false,
    invalidUser : false,
    message : ""
  })
  const navigate = useNavigate()
  const {userVerify,setAuth} = useAuth()
  //Functions

    const handleLoginSuccess = (response) =>{
      setAuth({name: response.name})
      console.log("Valid")
      setLoading(false)
      navigate('/home')
    }

    const handleLoginSubmit = (e) => {
      e.preventDefault()
      setLoading(true)
      setError({
        emailError : false,
        passwordError : false,
        invalidUser : false,
        message : ""
      })
      // if(!errorMessage(email,password).emailError && !errorMessage(email,password).passwordError){
        setTimeout(() => {
          userVerify(email,password)
          .then((res) => {
            if(res?.status===201 && res?.data?.id){
              handleLoginSuccess(res.data)
            }
          })
          .catch((err) => {
            if(err?.response?.data?.message === "User doesn't exist"){
              setError({
                emailError:false,
                passwordError : false,
                invalidUser : true,
                message:"Incorrect username or password"
              })
            }
            else{
              setError({
                emailError:false,
                passwordError : false,
                invalidUser : true,
                message:"Something went wrong !"
              })
            }
            setLoading(false)
          })
        }, 2000);
    
  }

  return (
    <div className="flex flex-col min-h-screen">
    <div className="mt-7 flex justify-center items-center">
   <Header/>
    </div>
    <div className="flex flex-col w-full items-center justify-center px-8 md:flex-row pb-8">
    <div className="w-full flex justify-center items-center md:mt-0 mt-8 md:w-[45%] md:h-auto ">
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-secondary text-[24px]  my-3 tracking-[1px]">Create a new account</h3>
    <form className="mt-6" onSubmit={handleLoginSubmit}>
    <Input label={"Name"} type={"name"} labelFor={"name"} value={name} labelClass={'text-[15px]'} inputClass={'!h-[35px]'} setValue={setName}/>
    <Input label={"Email ID"} type={"email"} labelFor={"email"} value={email} labelClass={'text-[15px]'} inputClass={'!h-[35px]'} setValue={setEmail} error={error.emailError} wrapperClass={"mt-12"}/>
    <Input label={"Password"} type={"password"} labelFor={"password"} value={password} isStrengthReqd={true} labelClass={'text-[15px]'} inputClass={'!h-[35px]'}  error={error.passwordError} setValue={setPassword} wrapperClass={"mt-12"}/>
    <Input label={"Confirm Password"} type={"password"} labelFor={"password"}  value={confirmPassword} labelClass={'text-[15px]'} inputClass={'!h-[35px]'}  error={error.passwordError} setValue={setConfirmPassword} wrapperClass={"mt-6"}/>
   
    <div className="min-h-[20px] text-sm flex items-center justify-center mt-6 text-veryWeak tracking-[1px] font-semibold">
      {error.emailError || error.passwordError || error.invalidUser ? (
    <div className="">{error.message}</div>
      ): (<></>)}
    </div>
    <div className="flex justify-center items-center mt-2">
    <Button buttonText={"LOGIN"} isLoading={loading}/>
    </div>
    </form>
    <p className="text-lg lg:text-xl font-semibold tracking-[2px] text-secondary mt-4">Already have an account? <span className="text-primary cursor-pointer hover:opacity-50 transition-all duration-200" onClick={() => {navigate('/login')}}>Sign in</span></p>
    </div>
    </div>
    </div>
  </div>
  )
}

export default Register