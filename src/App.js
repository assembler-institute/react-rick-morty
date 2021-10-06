import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { CHARACTER, EPISODES, EPISODE, HOME, LOCATION } from "constants/routes";
import { Character, Episode, Home, Location, NotFound } from "pages";

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
        path={EPISODES}
        render={(routeProps) => <Home {...routeProps} />}
      />
      <Route path="/not-found" component={NotFound} />
      <Redirect from={HOME} exact to={EPISODES} />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
