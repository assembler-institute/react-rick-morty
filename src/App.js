import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  CHARACTER,
  EPISODE,
  SPECIES,
  STATUS,
  LOCATION,
  HOME,
} from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Status from "./pages/Status";
import Species from "./pages/Species";
import Location from "./pages/Location";
import Character from "./pages/Character";

function App() {
  return (
    <Switch>
      <Route
        path={`${STATUS}`}
        render={(routeProps) => <Status {...routeProps} key={Date.now()} />}
      />
      <Route
        path={`${SPECIES}`}
        render={(routeProps) => <Species {...routeProps} key={Date.now()} />}
      />
      <Route
        path={`${EPISODE}/:episodeId`}
        render={(routeProps) => <Episode {...routeProps} key={Date.now()} />}
      />
      <Route
        path={`${LOCATION}/:locationId`}
        render={(routeProps) => <Location {...routeProps} key={Date.now()} />}
      />
      <Route
        path={`${CHARACTER}/:characterId`}
        render={(routeProps) => <Character {...routeProps} key={Date.now()} />}
      />
      <Route
        path={HOME}
        exact
        render={(routeProps) => <Home {...routeProps} key={Date.now()} />}
      />
    </Switch>
  );
}

export default App;
