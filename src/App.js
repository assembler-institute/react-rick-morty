import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  HOME,
  EPISODE,
  CHARACTER,
} from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";

function App() {
  return (
    <Switch>
      <Route
        path={`${EPISODE}/:episodeId`}
        render={(routeProps) => <Episode {...routeProps} />}
      />
      <Route
        path={`${CHARACTER}/:characterId`}
        render={(routeProps) => <Character {...routeProps} />}
      />
      <Route
        exact
        path={HOME}
        render={(routeProps) => <Home {...routeProps} />}
      />
    </Switch>
  );
}

export default App;
