import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  HOME,
  EPISODE,
} from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode";

function App() {
  return (
    <Switch>
      <Route
        path={`${EPISODE}/:episodeId`}
        render={(routeProps) => <Episode {...routeProps} />}
      />
      <Route exact path={HOME} render={(routeProps) => <Home {...routeProps} />} />
    </Switch>
  );
}

export default App;
