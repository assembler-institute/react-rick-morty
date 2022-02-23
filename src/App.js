import React from "react";
import { Switch, Route } from "react-router-dom"
import * as routes from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";

function App() {
  return (
    <Switch>
      <Route exact path={routes.HOME}>
        <Home />
      </Route>
      <Route path={`${routes.EPISODE}/:id`}>
        <Episode />
      </Route>

    </Switch >

  );
}

export default App;
