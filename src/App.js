import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import * as routes from "./constants/routes";

import Episode from "./pages/Episode/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location/Location";

function App() {
  return (
    <Switch>
      <Route
        exact
        path={`${routes.LOCATION}/:locationId`}
        component={Location}
      />
      <Route exact path={`${routes.EPISODE}/:episodeId`} component={Episode} />
      <Route
        exact
        path={`${routes.CHARACTER}/:characterId`}
        component={Character}
      />
      <Route exact path={routes.HOME} component={Home} />
      <Route path="*" component={Home} />
    </Switch>
  );

  /*   return <Home />; */
}

export default App;
