const React = require("react");
const ReactDOM = require("react-dom");

const { render } = ReactDOM;

const Business_Calculator = require("./components/Business_Calculator");

let default_state = require("../data/default_state.json");
default_state = JSON.parse(JSON.stringify(default_state));

render(
	<Business_Calculator data={default_state} />,
	document.getElementById("app-mount")
);
