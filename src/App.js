import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  CHARACTER,
  EPISODE,
  /* EPISODES, */
  HOME,
  LOCATION,
} from "./constants/routes";

import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

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
        path={`${LOCATION}/:locationId`}
        render={(routeProps) => (
          <Location {...routeProps} /* key={Date.now()}  */ />
        )} // Solution tu update the page when changing between locations. ASK
      />
      <Route path={HOME} render={(routeProps) => <Home {...routeProps} />} />
    </Switch>
  );
}

export default App;
