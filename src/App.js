import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CHARACTER, EPISODE, LOCATION } from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path={`${EPISODE}/:episodeId`} component={Episode} />
        <Route path={`${CHARACTER}/:charId`} component={Character} />
        <Route path={`${LOCATION}/:locationId`} component={Location} />
      </Switch>
    </Router>
  );
}

export default App;
