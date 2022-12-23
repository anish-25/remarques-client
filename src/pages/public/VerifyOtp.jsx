import React from "react";
import { useState } from "react";
import Header from "../../common-components/Header";
import Button from '../../common-components/Button'
import OtpInput from "react18-input-otp";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const {auth,setAuth,otpVerify} = useAuth()
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
   if(!auth.email){
    navigate('/register')
   }
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setErrMsg("")
    if(otp.length==4){
      setLoading(true)
      setTimeout(() => {
        otpVerify(auth.email,otp)
        .then(res => {
          setErrMsg("")
          setAuth(res?.data)
          setTimeout(() => {
            navigate('/home')
          }, 1000);
        })
        .catch(err => {
          setLoading(false)
          setErrMsg(err?.response?.data?.message)
        })
      }, 1000);
     
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-7 flex justify-center items-center">
        <Header />
      </div>
      <div className="flex flex-col w-full items-center justify-center px-8 md:flex-row pb-8">
        <div className="w-full flex justify-center items-center md:mt-0 mt-8 md:w-[45%] md:h-auto ">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-secondary text-[24px]  mt-10 tracking-[1px]">
              Verify OTP
            </h3>
            <p className="font-light text-lg text-secondary mt-12">
              Enter the OTP sent to <span className="font-semibold underline">{auth?.email}</span>
            </p>
            <form onSubmit={handleSubmit}>
            <div className="mt-16">
              <OtpInput
                value={otp}
                isInputNum={true}
                inputProps={{
                  onPaste: function (e) {
                    e.preventDefault();
                    return false;
                  },
                }}
                numInputs={4}
                inputStyle="flex-col font-semibold text-white items-center justify-center text-center !w-12 !h-12 mx-4 border bg-[#5AA153] focus:outline-blue-400"
                onChange={(otp) => setOtp(otp)}
              />
            </div>
            <div className="min-h-[70px] flex items-center justify-center">
              {errMsg.length ? (
                <p className="text-red-500 font-semibold mt-3 text-base text-center">{errMsg}</p>
              ):<></>}
            </div>
            <div className="flex justify-center items-center mt-4">
              <Button isLoading={loading} disabled={otp.length<4?true:false} buttonText={"SUBMIT"} />
            </div>
            </form>
            <p className="text-lg lg:text-xl font-semibold tracking-[2px] text-secondary mt-10">
              Haven't received any OTPs?
              <span
                className="text-primary cursor-pointer hover:opacity-50 transition-all duration-200"
                onClick={() => {
                  navigate("/login");
                }}
              >
                {" Click here "}
              </span>
              to send again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
