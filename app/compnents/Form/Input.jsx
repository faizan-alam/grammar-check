import React from "react";

const Input = ({ type, name, placeholder, value, onChange, required }) => {
  return (
    <input
      className="w-full py-3.5 px-2.5 my-2.5 mx-0 border border-[#ccc] rounded-sm"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
