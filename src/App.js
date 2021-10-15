import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "./pages/Home";
import Episode from "./pages/Episode";
import Character from "./pages/Character";
import Location from "./pages/Location";
import { FontStyle, GlobalStyle } from "./theme";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<FontStyle />
			<Switch>
				<Route exact path="/">
					<Redirect to="/1" />
				</Route>
				<Route
					exact
					path="/:page"
					render={(renderProps) => {
						const page = renderProps.match.params.page;
						return <Home page={page} />;
					}}
				/>
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
		</ThemeProvider>
	);
}

export default App;
