import React from "react";
import ReactDOM from "react-dom";
import Store from "./store";

const { render } = ReactDOM;
const Business_Calculator = require("./components/Business_Calculator");

render(
	<Business_Calculator />,
	document.getElementById("app-mount")
);
