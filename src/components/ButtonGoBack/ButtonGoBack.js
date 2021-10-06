import React from "react";

function ButtonGoBack({ path }) {
  return (
    <button className="btn btn-outline-info btn-sm mb-1" onClick={path.goBack}>
      back
    </button>
  );
}

export default ButtonGoBack;
