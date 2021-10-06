import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Character from "./pages/Character";
import Episode from "./pages/Episode";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/character/:characterId"
          component={Character}
        />
        <Route path="/episode/:episodeId" component={Episode} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default App;
