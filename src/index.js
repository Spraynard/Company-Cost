import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";

const Business_Calculator = require("./components/Business_Calculator");

const render = () =>
	ReactDOM.render(
		<Business_Calculator store={ store }/>,
		document.getElementById("app-mount")
	);

store.subscribe(render);
render();

