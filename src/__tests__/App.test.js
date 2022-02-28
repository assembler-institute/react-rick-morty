import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react"
import App from "../App";
import { BrowserRouter, Route } from "react-router-dom"
import { Fragment } from "react/cjs/react.production.min";
import * as routes from "../constants/routes";
import Home from "../pages/Home";
import Episode from "../pages/Episode/Episode";
import Character from "../pages/Character";
import Location from "../pages/Location";

describe("App component", () => {
  it("renders", () => {
    const component = render(<BrowserRouter><App /></BrowserRouter>)
    console.log(component)
  });

});
