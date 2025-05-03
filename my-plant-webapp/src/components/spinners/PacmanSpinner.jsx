import React from "react";
import { PacmanLoader } from "react-spinners";

const PacmanSpinner = ({ loading, pacColor }) => {
  return (
    <div className="flex justify-center items-center">
      <PacmanLoader color={pacColor} size={10} loading={loading} />
    </div>
  );
};

export default PacmanSpinner;
