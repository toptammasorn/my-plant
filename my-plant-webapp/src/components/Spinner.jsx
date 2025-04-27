import React from "react";
import { PacmanLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return (
    <PacmanLoader
      color="#dfffde"
      size={20}
      cssOverride={{ textAlign: "center" }}
      loading={loading}
    />
  );
};

export default Spinner;
