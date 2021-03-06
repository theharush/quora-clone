import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import "jquery"
import "popper.js"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"

import "./style/main.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
