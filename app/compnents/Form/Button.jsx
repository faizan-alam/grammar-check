import React from "react";

const Button = ({ loading, label, onClick }) => {
  return (
    <button
      type="submit"
      className="btn flex justify-center items-center"
      disabled={loading}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
