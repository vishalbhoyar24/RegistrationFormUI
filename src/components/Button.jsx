import React from "react";

const Button = ({ onSubmit, buttonText }) => {
  return (
    <div className="w-full py-5">
      <button
        className=" bg-blue-500 px-3 py-3 w-20 h-9 rounded-md text-white flex justify-center items-center"
        onClick={onSubmit}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
