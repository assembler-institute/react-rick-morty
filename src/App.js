
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import { EPISODE, HOME, CHARACTER, LOCATION } from "./constants/routes";
import Episode from "./pages/Episode"
import Character from "./pages/Character";
import Location from "./pages/Location";

function App() {
  return (
    <Switch>
      <Route exact path={HOME}> 
      <Redirect to={`1`} /> 
      </Route>
      <Route path={`${HOME}:page`} exact component={Home}/>
      <Route exact path={`${EPISODE}/:id`} component={Episode}/>
      <Route exact path={`${CHARACTER}/:id`} component={Character}/>
      <Route exact path={`${LOCATION}/:id`} component={Location}/>
    </Switch>
  );
}

export default App;
