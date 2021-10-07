import React from "react";
import { Switch, Route } from "react-router-dom";

import { EPISODE, HOME, LOCATION, CHARACTER } from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Location from "./pages/Location";
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
        path={`${LOCATION}/:locationId`}
        render={(routeProps) => <Location {...routeProps} />}
      />
      <Route path={HOME} render={(routeProps) => <Home {...routeProps} />} />
    </Switch>
  );
}

export default App;