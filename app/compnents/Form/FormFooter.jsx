import Link from "next/link";
import React from "react";

const FormFooter = ({ label, navigateLabel, navigate }) => {
  return (
    <p className="label">
      {label}{" "}
      <Link href={navigate} className="toggle">
        {navigateLabel}
      </Link>
    </p>
  );
};

export default FormFooter;
