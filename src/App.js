import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Episode from "./pages/Episode";

import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/episode/:episodeId"
          render={(routeProps) => <Episode {...routeProps} />}
        />

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
