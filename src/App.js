import React from "react";
import { Route, Switch } from "react-router";

import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";

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
			<Route
				exact
				path="/character/:id"
				render={(renderProps) => {
					const id = renderProps.match.params.id;

					return <Character id={id} />;
				}}
			/>
			<Route
				exact
				path="/location/:id"
				render={(renderProps) => {
					const id = renderProps.match.params.id;

					return <Location id={id} />;
				}}
			/>
		</Switch>
	);
}

export default App;
