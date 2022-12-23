import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../common-components/Header";
import HeroLogin from "../../assets/Images/HeroLogin.png"
import Input from "../../common-components/Input";
import Button from "../../common-components/Button";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
    invalidUser: false,
    message: ""
  })
  const navigate = useNavigate()
  const { userVerify, setAuth } = useAuth()
  //Functions

  const handleLoginSuccess = (response) => {
    console.log("Valid")
    setLoading(false)
    if (response?.isEmailVerified) {
      sessionStorage.setItem('id', response?.id)
      setAuth({ name: response.name })
      navigate('/home')
    }
    else {
      setAuth({ email })
      navigate('/verify-otp')
    }
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError({
      emailError: false,
      passwordError: false,
      invalidUser: false,
      message: ""
    })
    // if(!errorMessage(email,password).emailError && !errorMessage(email,password).passwordError){
    setTimeout(() => {
      userVerify(email, password)
        .then((res) => {
          if (res?.status === 201 && res?.data?.id) {
            handleLoginSuccess(res.data)
          }
        })
        .catch((err) => {
          if (err?.response?.data?.message === "User doesn't exist") {
            setError({
              emailError: false,
              passwordError: false,
              invalidUser: true,
              message: "Incorrect username or password"
            })
          }
          else {
            setError({
              emailError: false,
              passwordError: false,
              invalidUser: true,
              message: "Something went wrong !"
            })
          }
          setLoading(false)
        })
    }, 2000);

  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-7 flex justify-center items-center">
        <Header />
      </div>
      <div className="flex flex-col w-full px-8 md:flex-row pb-8">
        <div className="hidden w-full md:w-[55%] md:pl-28 flex-col items-center justify-center md:items-start md:justify-start md:flex h-[75vh]">
          <h3 className="text-secondary text-[25px] md:text-[28px] lg:text-[32px] my-6 tracking-[1px]">Save your notes online.</h3>
          <div className="mt-4 flex items-center justify-center md:justify-start md:items-start">
            <img src={HeroLogin} alt="save-notes" className="lg:w-full sm:w-[75%] w-[60%]" />
          </div>
        </div>
        <div className="w-full flex justify-center items-center md:mt-0 mt-8 md:w-[45%] md:h-auto ">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-secondary text-[25px] md:text-[28px] lg:text-[32px] my-6 tracking-[1px]">Login to start</h3>
            <form className="mt-10" onSubmit={handleLoginSubmit}>
              <Input label={"Email ID"} type={"email"} labelFor={"email"} value={email} setValue={setEmail} error={error.emailError} />
              <Input label={"Password"} type={"password"} labelFor={"password"} value={password} error={error.passwordError} setValue={setPassword} wrapperClass={"mt-12"} />
              <div className="min-h-[20px] text-sm flex items-center justify-center mt-8 text-veryWeak tracking-[1px] font-semibold">
                {error.emailError || error.passwordError || error.invalidUser ? (
                  <div className="">{error.message}</div>
                ) : (<></>)}
              </div>
              <div className="flex justify-center items-center mt-6">
                <Button buttonText={"LOGIN"} isLoading={loading} />
              </div>
            </form>
            <p className="text-lg lg:text-xl font-semibold tracking-[2px] text-secondary mt-8">Don't have an account yet? <span className="text-primary cursor-pointer hover:opacity-50 transition-all duration-200" onClick={() => { navigate('/register') }}>Sign up</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
