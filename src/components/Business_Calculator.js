import { Component } from "react";
import { PropTypes } from "prop-types";

import * as Store_Actions from "../actions";

import Top_App_Bar from "./Top_App_Bar";
import Groups_Window from "./Groups_Window";

/**
 * Overall controller for the App.
 */
class Business_Calculator extends Component {

	getChildContext() {
		return {
			store : this.props.store
		};
	}

	componentDidCatch(error, info) {
		console.error(error, info);
	}

	componentWillMount() {
		this.unsubscribe = store.subscribe(
			() => this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	// componentDidMount() {
	// 	// store.dispatch(resetAppData());
	// 	// store.dispatch(addExpenseGroup({}));
	// }

	render() {
		return (
			<div className="business-calculator">
				<Top_App_Bar />
				<Groups_Window />
			</div>
		);
	}
}

Business_Calculator.propTypes = {
	store: PropTypes.object.isRequired
};

Business_Calculator.childContextTypes = {
	store : PropTypes.object.isRequired
};

export { Business_Calculator };