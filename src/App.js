import React from "react";
import { Switch, Route } from "react-router-dom";

import { CHARACTER, EPISODE, HOME, LOCATION } from "constants/routes";
import { Character, Episode, Home, Location } from "pages";

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
      <Route
        path={HOME}
        render={(routeProps) => <Home {...routeProps} />}
      />
    </Switch>
  );
}

export default App;
