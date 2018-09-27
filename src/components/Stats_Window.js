import { PropTypes } from "prop-types";

/**
 * Pure functions only please!
 */
const Stats_Window = ( props, { store } ) => {

	const { expense_groups } = store.getState();

	return (
		<section className="stats-window">
			<span>You have { expense_groups.length } expense groups</span>
		</section>
	);
};

Stats_Window.contextTypes = {
	store : PropTypes.object.isRequired
};

module.exports = Stats_Window;