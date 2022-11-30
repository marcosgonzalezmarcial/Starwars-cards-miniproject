import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./base.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <>
    <BrowserRouter>
      <ScrollToTop />
      <App tab="home" />
    </BrowserRouter>
  </>
);
