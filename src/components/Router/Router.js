import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "../../App";
import Episode from "../../pages/Episode/Episode";
import Character from "../../pages/Character/Character";
import Location from "../../pages/Location/Location";
import * as routes from "../../constants/routes";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path={`${routes.HOME}`} component={App} exact />
      <Route path={`${routes.EPISODE}/:id`} component={Episode} />
      <Route path={`${routes.CHARACTER}/:id`} component={Character} />
      <Route path={`${routes.LOCATION}/:id`} component={Location} />
    </Switch>
  </BrowserRouter>
);

export default Router;
