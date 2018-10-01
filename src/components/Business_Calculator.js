import { Component } from "react";
import { PropTypes } from "prop-types";
import {
	resetAppData,
	addExpenseGroup
} from "../actions";

import Stats_Window from "./Stats_Window";
import Groups_Window from "./Groups_Window";

// CSS Import
import Colors from "./styles/Colors.less";
import "./styles/Business_Calculator.less";
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

	componentDidMount() {
		store.dispatch(resetAppData());
		store.dispatch(addExpenseGroup({}));
	}

	render() {
		return (
			<div className="business-calculator">
				<Stats_Window />
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

module.exports = Business_Calculator;