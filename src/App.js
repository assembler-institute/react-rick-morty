import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Episode from "./pages/Episode/Episode";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:episodeId" component={Episode} />
      </Switch>
    </Router>
  )
}

export default App;
