import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Wrapper from "./Wrapper";

ReactDOM.render(<Wrapper />, document.getElementById("root"));

serviceWorker.register();
