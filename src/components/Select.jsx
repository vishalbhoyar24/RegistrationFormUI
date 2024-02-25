import React from "react";

const Select = ({
  label,
  name,
  value = "",
  options,
  onChangeHandler,
  errorMsg,
  data,
}) => {
  return (
    <div className=" w-full mb-3">
      <div className=" w-full text-left py-1">{`${label} :`}</div>
      <div className="w-full ">
        <select
          name={name}
          value={value}
          className="w-full rounded-md px-3, py-2 text-black"
          onChange={onChangeHandler}
        >
          <option value="">please select a option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="errorMsg w-full my-3 text-center text-red-600">
        {errorMsg && <b>{errorMsg}</b>}
      </div>
    </div>
  );
};

export default Select;
