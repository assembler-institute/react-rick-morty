import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

function App() {
  return (
    <Switch>        
      <Route path="/episode" render={(props) => (
        <Episode {...props} />
      )} />
      
      <Route path="/character" render={(props) => (
        <Character {...props} />
      )} />

      <Route path="/location" render={(props) => (
        <Location {...props} />
      )} />
      
      <Route path="/" render={(props) => (
        <Home {...props} />
      )} />
    </Switch>
  );
}

export default App;
