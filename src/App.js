import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  // eslint-disable-next-line
  CHARACTER,
  EPISODE,
  // eslint-disable-next-line
  EPISODES,
  // eslint-disable-next-line
  LOCATION,
  HOME,
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
      <Route path={HOME} render={(routeProps) => <Home {...routeProps} />} />
    </Switch>
  );
}

export default App;
