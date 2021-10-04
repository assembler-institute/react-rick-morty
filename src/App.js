import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Episode from "./pages/Episode";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/episode/:id" exact component={Episode} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
