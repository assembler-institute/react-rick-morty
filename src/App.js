import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Character from "./pages/Character";
import Episode from "./pages/Episode/Episode";

import Home from "./pages/Home";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/episode/:episodeId"
          render={(routeProps) => <Episode {...routeProps} />}
        />
        <Route path="/character/:characterId"
        render={(routeProps)=> <Character {...routeProps} />}
        />
        <Route path="/location/:locationId"
        render={(routeProps)=> <Location {...routeProps} />}
        />
      </Switch>
    </>
  )

}

export default App;
