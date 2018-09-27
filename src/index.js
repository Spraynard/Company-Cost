import React from "react";
import { render } from "react-dom";
import store from "./store";

const Business_Calculator = require("./components/Business_Calculator");


const store_data = store();

window.store = store_data;
window.React = React;

render(
	<Business_Calculator store={store_data} />,
	document.getElementById("app-mount")
);
