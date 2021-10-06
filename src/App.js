import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  CHARACTER,
  EPISODE,
  EPISODES,
  HOME,
  LOCATION,
} from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";
import Character from "./pages/CharacterPage/Character";

function App() {
  return (
    <>
      <Switch>
        <Route path={HOME} exact component={Home} />
        <Route path={`${EPISODE}/:episodeId`}
        render={(routeProps)=><Episode {...routeProps} />}
        />
        <Route path={`${CHARACTER}/:characterId`}
          render={(routeProps)=><Character {...routeProps} />}
          />
      </Switch>
    </>
  );
}

export default App;
