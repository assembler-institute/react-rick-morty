import React from "react";
import { Route } from "react-router-dom"
import * as routes from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

function App() {
  return (
    <>
      <Route component={Home} exact path={routes.HOME} />

      <Route path={`${routes.EPISODE}/:id`} component={Episode} />


      <Route path={`${routes.CHARACTER}/:id`} component={Character} />
      <Route path={`${routes.LOCATION}/:id`} component={Location} />
    </>

  );
}

export default App;
