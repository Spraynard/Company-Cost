// React
import React from "react";

// Prop Types
import { PropTypes } from "prop-types";

// Custom Helpers
import {
	tableDataRef
} from "../dataReferenceObjects";

// Custom UI Components
import Expense_Group_Child_New from "./Expense_Group_Child_New";

// Material UI Components
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

// Material UI Styles
import { withStyles } from "@material-ui/core/styles";

// Helpers
import {
	capitalizeFirstLetter,
} from "../helpers/helpers";

// Redux Actions
import {
	editEntity,
	saveEntity,
	updateEntity,
	cancelEditEntity,
	removeExpenseGroupChild
} from "../actions";

const styles = {

};

class Expense_Group_Child_Table extends React.Component {

	constructor( props ) {
		super( props );
		this.childDataChangeHandler = this.childDataChangeHandler.bind(this);
		this.childClickHandler = this.childClickHandler.bind(this);
		this.childMouseActionsListener = this.childMouseActionsListener.bind(this);
		this.childKeyboardActionsListener = this.childKeyboardActionsListener.bind(this);
		this.childRemoveHandler = this.childRemoveHandler.bind(this);
	}

	componentDidMount() {
		// Find any children components in edit mode, and apply close/save window edit listeners.
		const { expense_group_child_by_id } = this.context.store.getState();

		const editChildID = Object.keys( expense_group_child_by_id )
			.filter( id => expense_group_child_by_id[id].edit )[0];

		this.mouseListener = null;
		this.keyboardListener = null;

		if ( editChildID )
		{
			this.addActionListeners( editChildID );
		}
	}

	addActionListeners( id ) {
		// Applying curring to the keyboard and click actions in order to effectively remove these event listeners.
		let mouseListener = this.childMouseActionsListener( id );
		let keyboardListener = this.childKeyboardActionsListener( id );

		this.mouseListener = mouseListener;
		this.keyboardListener = keyboardListener;

		window.addEventListener("click", mouseListener ); // For Clicking on children
		window.addEventListener("keydown", keyboardListener ); // For Enter Key Press
	}

	removeActionListeners() {
		if ( this.mouseListener )
		{
			window.removeEventListener("click", this.mouseListener);
		}

		if ( this.keyboardListener )
		{
			window.removeEventListener("keydown", this.keyboardListener);
		}
	}

	childMouseActionsListener( id ) {
		const handler = ( event ) => {
			// If the current event shows that we are not clicking on this actual object, then we remove edit mode on the item.
			console.log("Event Target", event.target );
			console.log("Event Target Parent Node", event.target.parentNode );
			if ( event.target.parentNode.dataset.id !== id && event.target.tagName !== "INPUT" )
			{
				this.context.store.dispatch(saveEntity({ id }));
				this.removeActionListeners( id );
			}
		};
		return handler;
	}

	childKeyboardActionsListener( id ) {
		const handler = ( event ) => {
			let dispatchAction;
			let keyCode = event.which;

			switch ( keyCode ) {
				case 13: // Enter Key
					dispatchAction = saveEntity({id});
					break;
				case 27: // Escape Key
					dispatchAction = cancelEditEntity({id});
					break;
				default:
					dispatchAction = null;
					break;
			}

			if ( dispatchAction )
			{
				this.context.store.dispatch( dispatchAction );
				this.removeActionListeners( id );
			}

		};
		return handler;
	}

	/**
	 * On click of a child. We want to edit it, so we send the ID
	 * of the child over to the action
	 */
	childClickHandler( id, editing ) {
		if ( editing )
		{
			return;
		}
		else
		{
			this.context.store.dispatch( editEntity({ id }));
			this.addActionListeners( id );
		}
	}

	// also adding a listener that will check, on click, if we're clicking on

	/**
	 * Handling the change events that occur on edit items when a
	 * user updates the values.
	 */
	childDataChangeHandler( id, event ) {
		return this.context.store.dispatch(updateEntity({ id, [ event.target.name ] : event.target.value }));
	}

	// Deletes an expense group child from the list.
	childRemoveHandler( id, parentID, event ) {
		event.stopPropagation();
		const action = removeExpenseGroupChild({ id, parentID });

		this.context.store.dispatch( action );
	}

	componentWillUnmount() {
		console.log("Unmounting Component");
	}

	render() {
		const { childrenIDs, childrenTotalCost, parentGroupCostUOM } = this.props;

		return (
			<Table>
				<TableHead>
					<TableRow variant="header">
						{ Object.keys( tableDataRef ).map( ( dataProp, index ) => (
							<TableCell key={index} padding="none">{capitalizeFirstLetter( dataProp )}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{ childrenIDs.map( ( dataId, index ) => (
						<Expense_Group_Child_New
							key={index}
							childID={dataId}
							childClickHandler={this.childClickHandler}
							childDataChangeHandler={this.childDataChangeHandler}
							childRemoveHandler={this.childRemoveHandler}
						/>
					))}
				</TableBody>
				<TableFooter>
					{/** Total # and Cost of expenses **/}
					<TableRow variant="footer">
						<TableCell padding="none">Total Cost</TableCell>
						<TableCell padding="none">{`$${childrenTotalCost.costFormat()} per ${parentGroupCostUOM}`}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		);
	}
}

Expense_Group_Child_Table.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles( styles )( Expense_Group_Child_Table );