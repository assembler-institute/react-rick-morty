import React from "react";

function Main({ children, ...props }) {
  return (
    <main className="container" {...props}>
      {children}
      
    </main>
  );
}

export default Main;
