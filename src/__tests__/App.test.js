import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react"
import App from "../App";
import { BrowserRouter } from "react-router-dom"


describe("App component", () => {
  it("renders", () => {
    const component = render(<BrowserRouter><App /></BrowserRouter>)
    console.log(component)
  });

});
