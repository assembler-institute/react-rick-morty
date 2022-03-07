import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import App from "../App";


describe("App component", () => {
  it("renders", () => {
    const component = render(<BrowserRouter><App /></BrowserRouter>)
    expect(1).toBe(1)
  });

});
