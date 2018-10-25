import React from "react";
import { render } from "react-dom";
import store from "./store";
import stateData from "../data/default_state.json";
import "normalize.css"; // Normalize CSS
import "./components/styles/Base.less";

const Business_Calculator = require("./components/Business_Calculator");


const store_data = store( stateData );

window.store = store_data;
window.React = React;

render(
	<Business_Calculator store={store_data} />,
	document.getElementById("app-mount")
);
