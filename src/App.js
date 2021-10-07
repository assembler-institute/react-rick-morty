import React from "react";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location"
import { EPISODE, HOME, LOCATION, CHARACTER } from  "./constants/routes.js";
import { Route, Switch } from "react-router";
import "./App.scss"

function App() {
  return (
    <Switch>
      <Route exact path={HOME} component={Home}/>
      <Route exact path={`${EPISODE}/:id`} component={Episode}/>
      <Route exact path={`${CHARACTER}/:id`} component={Character}/>
      <Route exact path={`${LOCATION}/:id`} component={Location}/>
    </Switch>
  )
}

export default App;
