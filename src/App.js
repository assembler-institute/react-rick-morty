import React from "react";

import Home from "./pages/Home";
import Episode from "./pages/Episode";

function App({ page }) {
  return (
    page === "home" ? <Home /> : <Episode />
  )
}

export default App;
