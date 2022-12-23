import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const OtpInput = ({ otpLength }) => {
  let lengthArr = [];
  const [val, setVal] = useState([]);
  for (let i = 0; i < otpLength; i++) {
    lengthArr.push(i);
  }
  const [samp, setSamp] = useState([1,3,2,1])
  useEffect(() => {
 console.log(val)
  }, [val])
  
  const handleKeyUp = (ind,e) => {
    let key = e.key
    if(!isNaN(key) && key !== ' '){
        let newVal = [...val]
        newVal[ind]=key
        setVal(newVal)
        let indexOfnext = ind + 1;
        let next = document.getElementById("input-" + indexOfnext);
        if (next) {
            next.focus();
          }
    }


    if(key == 'Backspace'){
        let newVal = [...val]
        newVal[ind] = ""
        setVal(newVal)
        let indexOfprev = ind - 1;
        let prev = document.getElementById("input-" + indexOfprev);
        if (prev) {
            prev.focus();
          }
    }
  }

  if (lengthArr.length) {
    return lengthArr.map((val, ind) => {
      return (
        <input
          id={"input-" + ind}
          key={"input-" + ind}
          tabIndex={ind}
          value={val[ind]}
          type="number"
          min={0}
          max={9}
          maxLength={1}
        //   onChange={(e) => handleOnChange(ind, e)}
          onKeyUp = {(e) => handleKeyUp(ind,e)}
          className="flex-col font-semibold text-white items-center justify-center text-center w-12 h-12 mx-2 border bg-primary focus:outline-blue-400"
        />
      );
    });
  }
};

export default OtpInput;
