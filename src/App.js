import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  CHARACTER,
  EPISODE,
  HOME,
  LOCATION,
} from "./constants/routes";
import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";
import Character from "./pages/CharacterPage/Character";
import Location from "./pages/Location/Location";

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
         <Route
        path={`${LOCATION}/:locationId`}
        render={(routeProps) => <Location {...routeProps} />}
      />
      </Switch>
    </>
  );
}

export default App;
