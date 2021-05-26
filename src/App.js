import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HOME, EPISODE, CHARACTER } from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={`${CHARACTER}/:characterId`}
          render={(routerProps) => <Character {...routerProps} />}
        />
        <Route
          path={`${EPISODE}/:episodeId`}
          render={(routerProps) => <Episode {...routerProps} />}
        />
        <Route
          path={HOME}
          render={(routerProps) => <Home {...routerProps} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
