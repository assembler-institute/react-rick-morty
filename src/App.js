
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import { EPISODE, HOME } from "./constants/routes";
import Episode from "./pages/Episode"

function App() {
  return (
    <Switch>
      <Route exact path={HOME}>
        <Redirect to={`1`} />
      </Route>
      <Route
        path={`${HOME}:page`}
        exact
        component={Home}
      />
      <Route
        exact path={`${EPISODE}/:id`} component={Episode}
      />
    </Switch>
  );
}

export default App;
