import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Character from "./pages/Character";
import Episode from "./pages/Episode";

import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/episode/:episodeId" component={Episode} />
        <Route exact path="/character/:characterId" component={Character} />
        {/* <Route exact path="/location/:locationId" component={Location} /> */}

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
