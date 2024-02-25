import React from "react";

const TextArea = ({
  label,
  placeholder,
  name,
  value = "",
  onChangeHandler,
  errorMsg,
  data,
}) => {
  return (
    <div className=" w-full mb-3">
      <div className=" w-full text-left py-1">{`${label} :`}</div>
      <div className="textArea">
        <textarea
          className="w-full rounded-md p-2 text-black"
          value={value}
          name={name}
          cols="30"
          rows="1"
          onChange={onChangeHandler}
          placeholder={placeholder}
        ></textarea>
      </div>
      <div className="errorMsg w-full my-3 text-center text-red-600">
        {errorMsg && <b>{errorMsg}</b>}
      </div>
    </div>
  );
};

export default TextArea;
