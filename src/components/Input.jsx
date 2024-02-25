import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Input = ({
  label,
  placeholder,
  type,
  name,
  required,
  value = "",
  errorMsg,
  options = "",
  onChangeHandler,
  imagePreview,
  fileInputRef,
  data,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "email" || type === "password") {
    return (
      <div className=" w-full mb-3">
        <div className=" w-full text-left py-1">{`${label} :`}</div>
        <div className="w-full relative">
          <input
            className="w-full px-2 py-2 rounded-md text-black"
            value={data ? data[type] : value}
            onChange={onChangeHandler}
            type={label === "Password" ? (showPassword ? "text" : type) : type}
            name={name}
            placeholder={placeholder}
            required={required}
          />
          {label === "Password" && (
            <button
              className="absolute top-2.5 right-3 text-black focus:outline-none text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          )}
        </div>
        <div className="errorMsg w-full my-3 text-center text-red-600">
          {errorMsg && <b>{errorMsg}</b>}
        </div>
      </div>
    );
  }
  if (type === "radio") {
    return (
      <div className=" w-full mb-3">
        <div className=" w-full text-left py-1">{`${label} :`}</div>
        {options.map((option, index) => {
          return (
            <span className="w-full " key={index}>
              <span className="mr-2">
                <input
                  value={option}
                  type={type}
                  name={name}
                  className="cursor-pointer"
                  onChange={onChangeHandler}
                  checked={option === value}
                  id={option}
                />
              </span>
              <span className="mr-5">{option}</span>
            </span>
          );
        })}
        <div className="errorMsg w-full my-3 text-center text-red-600">
          {errorMsg && <b>{errorMsg}</b>}
        </div>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className=" w-full mb-3">
        <div className=" w-full text-left py-1">{`${label} :`}</div>
        {options.map((option, index) => {
          return (
            <span className="w-full " key={index}>
              <span className="mr-2">
                <input
                  value={option}
                  type={type}
                  name={name}
                  className="cursor-pointer"
                  checked={value.split(",").includes(option)}
                  onChange={onChangeHandler}
                  id={option}
                />
              </span>
              <span className="mr-5">{option}</span>
            </span>
          );
        })}
        <div className="errorMsg w-full my-3 text-center text-red-600">
          {errorMsg && <b>{errorMsg}</b>}
        </div>
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className=" w-full mb-3">
        <div className=" w-full text-left py-1">{`${label} :`}</div>
        <div className="w-full flex">
          <input
            className=" px-2 py-2 rounded-md text-black  "
            onChange={onChangeHandler}
            type={type}
            name={name}
            ref={fileInputRef}
          />
          {(imagePreview || data) && (
            <img
              src={imagePreview}
              alt="image"
              width={100}
              height={100}
              className=" object-cover object-center"
            />
          )}
        </div>
        <div className="errorMsg w-full my-3 text-center text-red-600">
          {errorMsg && <b>{errorMsg}</b>}
        </div>
      </div>
    );
  }
};

export default Input;
