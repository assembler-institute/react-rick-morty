import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Episode from "./pages/Episode/Episode";
import Character from "./pages/Characters/Character";
import * as routes from "../src/constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${routes.EPISODE}/:id`} component={Episode} />
        <Route path={`${routes.CHARACTER}/:id`} component={Character} />
        <Route exact path={`${routes.HOME}`} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
