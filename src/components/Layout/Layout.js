import React from "react";

import AppHeader from "../AppHeader";
import Main from "../Main";
import Footer from "../Footer";

function Layout({ children }) {
  return (
    <React.Fragment>
      <AppHeader />
      <Main>{children}</Main>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
