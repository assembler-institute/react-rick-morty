import React from "react";
import { Route } from "react-router-dom"
import { Fragment } from "react/cjs/react.production.min";
import * as routes from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

function App() {
  return (
    <Fragment>
      <Route exact path={routes.HOME} component={Home} />

      <Route path={`${routes.EPISODE}/:id`} component={Episode} />


      <Route path={`${routes.CHARACTER}/:id`} component={Character} />
      <Route path={`${routes.LOCATION}/:id`} component={Location} />
    </Fragment>

  );
}

export default App;
