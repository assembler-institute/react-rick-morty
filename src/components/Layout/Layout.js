import React from "react";

import { AppHeader, Footer, Main } from "components";

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
