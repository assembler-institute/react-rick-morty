import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  // eslint-disable-next-line
  CHARACTER,
  EPISODE,
  // eslint-disable-next-line
  EPISODES,
  LOCATION,
  HOME,
} from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Location from "./pages/Location";

function App() {
  return (
    <Switch>
      <Route
        path={`${EPISODE}/:episodeId`}
        render={(routeProps) => <Episode {...routeProps} />}
      />
      <Route
        path={`${LOCATION}/:locationId`}
        render={(routeProps) => <Location {...routeProps} />}
      />
      <Route path={HOME} render={(routeProps) => <Home {...routeProps} />} />
    </Switch>
  );
}

export default App;
