import { PropTypes, Component } from "react";

const Expense_Group = require("./Expense_Group.js");
const Stats_Window = require("./Stats_Window.js");

/**
 * Overall controller for the App.
 */
class Business_Calculator extends Component {

	getChildContext() {
		return {
			store : this.props.store
		};
	}

	componentWillMount() {
		this.unsubscribe = store.subscribe(
			() => this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		let store = this.props.store;

		return (
			<div class="business-calculator">
				<Stats_Window store={store} />
			</div>
		);
	}
}

Business_Calculator.PropTypes = {
	store: PropTypes.object.isRequired
};

Business_Calculator.childContextTypes = {
	store : PropTypes.object.isRequired
};

module.exports = Business_Calculator;