import React, { useState } from "react";
import { validatePasswordStrength } from "../utils/validation";

const Input = ({
  label,
  labelFor,
  type,
  labelClass,
  inputClass,
  wrapperClass,
  value,
  setValue,
  isStrengthReqd,
  error
}) => {

  const passwordStrength = validatePasswordStrength(value).status
  const strengthColor = validatePasswordStrength(value).color

  return (
    <div className={`relative ${wrapperClass}`}>
      <input
        type={type}
        required={true}
        className={`bg-transparent font-medium tracking-[1px] text-secondary border-2 border-transparent hover:border-x-primary hover:opacity-100 focus:border-x-primary focus:opacity-100 transition-all duration-300 rounded-md opacity-50 h-[45px] w-[338px] md:h-[52px] md:w-[346px] outline-none px-4 ${
          value.length ? "border-x-primary opacity-100 " : ""
        } ${error?" border-x-veryWeak focus:border-x-veryWeak hover:border-x-veryWeak":""} ${inputClass} `}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
      />
      {label && (
        <label
          className={`absolute left-0 -top-6 text-secondary font-normal tracking-[2px] opacity-70 ${error?" text-veryWeak opacity-100" : ""} ${labelClass}`}
          htmlFor={labelFor}
        >
          {label}
        </label>
      )}
      {type==="password" && isStrengthReqd&&(
        <div className="absolute right-3 top-0 flex justify-end items-center min-h-[30px] text-sm">
            {value.length ? (
          <span className={`${strengthColor} `}>{` `+passwordStrength}</span>) : <></>}
          </div>
          )}
    </div>
  );
};

export default Input;
