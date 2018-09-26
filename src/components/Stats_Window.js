const React = require("react");
/**
 * Pure functions only please!
 */
const Stats_Window = ( props, { store } ) => {
	let stateObject = store.getState();
	console.log( stateObject );

	return (
		<div className="stats-window">
			Stats_Window
			You have
		</div>
	);
};

module.exports = Stats_Window;