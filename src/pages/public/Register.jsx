import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../common-components/Button'
import Header from '../../common-components/Header'
import Input from '../../common-components/Input'
import { useAuth } from '../../hooks/useAuth'
import { confirmPassCheck, errorMessage } from '../../utils/validation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
    invalidUser: false,
    message: ""
  })
  const navigate = useNavigate()
  const { createUser, setAuth } = useAuth()
  //Functions

  const handleLoginSuccess = (response) => {
    setAuth({ email })
    setTimeout(() => {
      setLoading(false)
      navigate('/verify-otp')
    }, 1000);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setServerError("")
    setError({
      emailError: false,
      passwordError: false,
      invalidUser: false,
      message: ""
    })


    if (!errorMessage(email, password).emailError && !errorMessage(email, password).passwordError) {
      if (confirmPassCheck(password, confirmPassword).error) {
        setTimeout(() => {
          setLoading(false)
          toast.error(confirmPassCheck(password, confirmPassword).message)
        }, 1000)
      }
      else {
        setTimeout(() => {
          createUser(name, email, password)
            .then((res) => {
              if (res?.status === 201) {
                handleLoginSuccess(res.data)
              }
            })
            .catch((err) => {
              console.log(err)
              setServerError(err?.response?.data?.message)
              setLoading(false)
            })
        }, 2000);
      }

    }
    else {
      setTimeout(() => {
        console.log(errorMessage(email, password))
        setLoading(false)
        toast.error(errorMessage(email, password).message, {
          autoClose: 5000,
          position: 'top-right'
        })
        setError(errorMessage(email, password))
      }, 1000)
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer limit={1} />
      <div className="mt-7 flex justify-center items-center">
        <Header />
      </div>
      <div className="flex flex-col w-full items-center justify-center px-8 md:flex-row pb-8">
        <div className="w-full flex justify-center items-center md:mt-0 mt-8 md:w-[45%] md:h-auto ">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-secondary text-[24px]  my-3 tracking-[1px]">Create a new account</h3>
            <form className="mt-6" onSubmit={handleLoginSubmit}>
              <Input label={"Name"} type={"name"} labelFor={"name"} value={name} labelClass={'text-[15px]'} inputClass={'!h-[35px]'} setValue={setName} />
              <Input label={"Email ID"} type={"email"} labelFor={"email"} value={email} labelClass={'text-[15px]'} inputClass={'!h-[35px]'} setValue={setEmail} error={error.emailError} wrapperClass={"mt-12"} />
              <Input label={"Password"} type={"password"} labelFor={"password"} value={password} isStrengthReqd={true} labelClass={'text-[15px]'} inputClass={'!h-[35px]'} error={error.passwordError} setValue={setPassword} wrapperClass={"mt-12"} />
              <Input label={"Confirm Password"} type={"password"} labelFor={"password"} value={confirmPassword} labelClass={'text-[15px]'} inputClass={'!h-[35px]'} error={confirmPassword.length && confirmPassCheck(password, confirmPassword).error} setValue={setConfirmPassword} wrapperClass={"mt-12"} />

              <div className="min-h-[20px] text-sm flex items-center justify-center mt-6 text-veryWeak tracking-[1px] font-semibold">
                {serverError ? (
                  <div className="">{serverError}</div>
                ) : (<></>)}
              </div>
              <div className="flex justify-center items-center mt-4">
                <Button buttonText={"REGISTER"} isLoading={loading} />
              </div>
            </form>
            <p className="text-lg lg:text-xl font-semibold tracking-[2px] text-secondary mt-4">Already have an account? <span className="text-primary cursor-pointer hover:opacity-50 transition-all duration-200" onClick={() => { navigate('/login') }}>Sign in</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register