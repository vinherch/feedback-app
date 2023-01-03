import React from "react";
import spinner from "../../utils/loadingspinner.gif";

function LoadingSpinner() {
  return <img src={spinner} alt="Loading ..." style={{ width: "300px", margin: "auto", display: "block" }}></img>;
}

export default LoadingSpinner;
