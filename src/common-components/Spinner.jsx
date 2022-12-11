import React from "react";
import "../css/spinner.css";
const Spinner = ({
    height,
    width,
    border,
    className,
}) => {
  return (
    <div className="lds-ring h-[40px] w-[40px]">
      <div className={`h-[20px] w-[20px] border-2 border-white ${className}`}></div>
      <div className={`h-[20px] w-[20px] border-2 border-white ${className}`}></div>
      <div className={`h-[20px] w-[20px] border-2 border-white ${className}`}></div>
      <div className={`h-[20px] w-[20px] border-2 border-white ${className}`}></div>
    </div>
  );
};

export default Spinner;
