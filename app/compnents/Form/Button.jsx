import React from "react";

const Button = ({ loading, label, onClick }) => {
  return (
    <button
      type="submit"
      className="w-full px-4 py-3 bg-blue-500 text-white rounded cursor-pointer mt-2 hover:bg-blue-600 transition flex justify-center items-center"
      disabled={loading}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
