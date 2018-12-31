import { Component } from "react";
import { PropTypes } from "prop-types";

import * as Store_Actions from "../actions";

import Top_App_Bar from "./Top_App_Bar";
import Groups_Window from "./Groups_Window";


// Redux Actions
import {
	editEntity,
	updateEntity,
	saveEntity,
	cancelEditEntity
} from "../actions";

/**
 * Overall controller for the App.
 */
class Business_Calculator extends Component {

	constructor( props ) {
		super( props );
		this.handleClick = this.handleClick.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
		this.expense_group_children = store.getState().expense_group_child_by_id;
	}

	getChildContext() {
		return {
			store : this.props.store,
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
		window.removeEventListener("click", this.handleClick);
		window.removeEventListener("keydown",  this.handleKeypress);
	}

	componentDidMount() {
	/**
	 * On this global subscription, I want to remove editing state from expense group children
	 * if we are not clicking on that actual element in the dom.
	 *
	 * Each child expense has an outer "data-id" parameter on it. On a click, we reference the current element, as well
	 * as loop up parent elements and reference those. We remove edit state if we cannot find a data-id.
	 */
		window.addEventListener("click", this.handleClick);
		window.addEventListener("keydown", this.handleKeypress);
		// store.dispatch(resetAppData());
		// store.dispatch(addExpenseGroup({}));
	}

	handleClick( e ) {
		let clickTarget = e.target;
		let childID = null;

		const { expense_group_child_by_id } = store.getState();

		// Loop Invariant?
		while ( !childID && clickTarget.parentNode && clickTarget !== document )
		{
			if ( clickTarget.dataset )
			{
				childID = clickTarget.dataset.id;
			}

			// Setting next value up for loop case.
			clickTarget = clickTarget.parentNode;
		}

		// Refernce current children, and remove edit on children that do not have this id.
		for ( let i = 0; i < Object.keys( expense_group_child_by_id ).length; i++ )
		{
			let id = Object.keys( expense_group_child_by_id )[i];

			if ( id === childID )
			{
				continue;
			}

			const childData = expense_group_child_by_id[ id ];

			if ( childData.edit )
			{
				store.dispatch(saveEntity({ id }));
			}
		}
	}

	handleKeypress( e ) {
		let dispatchAction;
		let keyCode = e.which;
		const { expense_group_child_by_id } = store.getState();

		switch ( keyCode ) {
			case 13: // Enter Key
				dispatchAction = saveEntity;
				break;
			case 27: // Escape Key
				dispatchAction = cancelEditEntity;
				break;
			default:
				dispatchAction = null;
				break;
		}

		let childID = Object.keys( expense_group_child_by_id ).filter( id => expense_group_child_by_id[id].edit )[0];

		if ( dispatchAction && childID )
		{
			store.dispatch( dispatchAction({ id : childID }) );
		}
	}

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
	store: PropTypes.object.isRequired,
};

Business_Calculator.childContextTypes = {
	store : PropTypes.object.isRequired,
};

export { Business_Calculator };