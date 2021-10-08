import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import * as routes from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.HOME} exact component={Home} />
        <Route path={`${routes.EPISODE}/:id`} exact component={Episode} />
        <Route path={`${routes.CHARACTER}/:id`} exact component={Character} />
        <Route path={`${routes.LOCATION}/:id`} exact component={Location} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
