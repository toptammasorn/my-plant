import React from "react";
import { PacmanLoader } from "react-spinners";

const PacmanSpinner = ({ name, loading, pacColor }) => {
  return (
    <div className={`flex justify-center items-center ${name && "mt-25"}`}>
      <PacmanLoader
        color={pacColor}
        size={`${name ? 30 : 10}`}
        loading={loading}
      />
    </div>
  );
};

export default PacmanSpinner;
