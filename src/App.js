import React from "react";
import { Route, Switch } from "react-router-dom";

import * as routes from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";

function App() {
  return (
    <Switch>
      <Route exact path={`${routes.EPISODE}/:episodeId`} component={Episode} />
      <Route exact path={`${routes.CHARACTER}/:characterId`} component={Episode} />
      <Route exact path={routes.HOME} component={Home} />
      <Route path="*" component={Home} />
    </Switch>
  );

  /*   return <Home />; */
}

export default App;
