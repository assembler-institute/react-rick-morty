import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  HOME,
  EPISODE,
  EPISODES,
  LOCATION,
  CHARACTER,
} from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode";

function App() {
  return (
    <Switch>
      <Route path={HOME} render={(routeProps) => <Home {...routeProps} />} />
      <Route
        path={`${EPISODES}/:episodeId`}
        render={(routeProps) => <Episode {...routeProps} />}
      />
    </Switch>
  );
}

export default App;
