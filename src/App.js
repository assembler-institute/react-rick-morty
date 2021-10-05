import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

export default App;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/episode/:episodeId" component={Episode} />
        <Route exact path="/character/:characterId" component={Character} />
        <Route exact path="/location/:locationId" component={Location} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}
