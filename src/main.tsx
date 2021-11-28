import React from "react";
import ReactDOM from "react-dom";

import InitialOptions from "./constants/options";
import App from "./App";

import "./index.scss";

window.webOfLife = {
  options: InitialOptions,
  initialState: null,
  shouldSessionBeKilled: false,
  isSessionInProgress: false,
  graph: null,
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
