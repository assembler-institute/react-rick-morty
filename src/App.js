import React from "react";
import { Route, Switch } from "react-router";

import Home from "./pages/Home";
import Episode from "./pages/Episode";

function App() {
	return (
		<Switch>
			<Route exact path="/" render={() => <Home />} />
			<Route
				exact
				path="/episode/:id"
				render={(renderProps) => {
					const id = renderProps.match.params.id;

					return <Episode id={id} />;
				}}
			/>
		</Switch>
	);
}

export default App;
