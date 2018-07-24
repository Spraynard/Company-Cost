import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";

const { render } = ReactDOM;
const Business_Calculator = require("./components/Business_Calculator");

render(
	<Business_Calculator store={ store }/>,
	document.getElementById("app-mount")
);
