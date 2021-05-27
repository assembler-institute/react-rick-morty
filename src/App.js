import React from "react";

import { Switch, Route } from "react-router-dom";

import {
  CHARACTER,
  EPISODE,
  // EPISODES,
  HOME,
  LOCATION,
} from "./constants/routes";

import Home from "./pages/Home";
import Episode from "./pages/Episode";
import CharacterPage from "./pages/Character";
import LocationPage from "./pages/LocationPage";

function App() {
  return (
    <Switch>
      <Route
        path={`${EPISODE}/:episodeId`}
        render={(routeProps) => <Episode {...routeProps} />}
      />
      <Route
        path={`${CHARACTER}/:characterId`}
        render={(routeProps) => <CharacterPage {...routeProps} />}
      />
      <Route
        path={`${LOCATION}/:locationId`}
        render={(routeProps) => <LocationPage {...routeProps} />}
      />
      <Route path={HOME} render={(routeProps) => <Home {...routeProps} />} />
    </Switch>
  );
}

export default App;
