
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import { EPISODE, HOME, CHARACTER } from "./constants/routes";
import Episode from "./pages/Episode"
import Character from "./pages/Character";

function App() {
  return (
    <Switch>
      <Route exact path={HOME}> 
      <Redirect to={`1`} /> 
      </Route>
      <Route path={`${HOME}:page`} exact component={Home}/>
      <Route exact path={`${EPISODE}/:id`} component={Episode}/>
      <Route exact path={`${CHARACTER}/:id`} component={Character}/>
    </Switch>
  );
}

export default App;
