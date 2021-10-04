import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  CHARACTER,
  EPISODE,
  EPISODES,
  HOME,
  LOCATION,
} from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";

function App() {
  return (
    <>
      <Switch>
        <Route path={HOME} exact component={Home} />
        {/* <Route path={EPISODES} component={}/> */}
        <Route path={EPISODE} component={Episode} />
        {/* <Route path={LOCATION} component={}/>
        <Route path={CHARACTER} component={}/> */}
      </Switch>
    </>
  );
}

export default App;
