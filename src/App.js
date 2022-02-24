import React from "react";
import { Switch, Route } from "react-router-dom"
import * as routes from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";
import Character from "./pages/Character";

function App() {
  return (
    <Switch>
      <Route exact path={routes.HOME}>
        <Home />
      </Route>
      <Route path={`${routes.EPISODE}/:id`}>
        <Episode />
      </Route>

      <Route path={`${routes.CHARACTER}/:id`}>
        <Character />
      </Route>

    </Switch >

  );
}

export default App;
