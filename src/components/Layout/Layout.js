import React from "react";

import AppHeader from "../AppHeader";
import Main from "../Main";
import Footer from "../Footer";

function Layout({ children }) {
  return (
    <>
      <AppHeader />
      <Main>{children}</Main>
      
      <Footer />
    </>
  );
}

export default Layout;
