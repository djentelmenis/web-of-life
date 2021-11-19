import React from "react";
import ReactDOM from "react-dom";

import OPTIONS from "./constants/options";
import App from "./App";

import "./index.scss";

window.webOfLife = {
  options: OPTIONS,
  initialState: null,
  shouldSessionBeKilled: false,
  isSessionInProgress: false,
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
