import React from "react";

import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character"
import Location from "./pages/Location"

function App({ page }) {
  if (page === "home") return <Home />
  if (page === "episode") return <Episode />
  if (page === "character") return <Character />
  if (page === "location") return <Location />
}

export default App;
