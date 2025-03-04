import Link from "next/link";
import React from "react";

const FormFooter = ({ label, navigateLabel, navigate }) => {
  return (
    <p className="text-black mt-4">
      {label}{" "}
      <Link
        href={navigate}
        className="text-blue-500 cursor-pointer no-underline hover:underline"
      >
        {navigateLabel}
      </Link>
    </p>
  );
};

export default FormFooter;
