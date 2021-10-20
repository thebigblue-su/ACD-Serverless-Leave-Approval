import React from "react";
import { useHistory } from "react-router";

const Error = () => {
  const history = useHistory();

  return (
    <div className="text-center mt-5">
      <h1>Error Page | Page Not Found </h1>
      <br />
      <button onClick={() => history.push("/")} className="btn btn-info">
        Go Home
      </button>
    </div>
  );
};

export default Error;
