import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

function App() {
  return (
    <Router>
      <Switch>
        {/* add routes here */}
        <Route path="/location/:locationId" component={Location} />
        <Route path="/character/:id" component={Character} />
        <Route path="/episode/:id" component={Episode} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
