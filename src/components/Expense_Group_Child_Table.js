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
	updateEntity,
	removeExpenseGroupChild
} from "../actions";

const styles = {

};

const Expense_Group_Child_Table = ( props, { store } ) => {

	const { childrenIDs, childrenTotalCost, parentGroupCostUOM } = props;

	// Deletes an expense group child from the list.
	const childRemoveHandler = ( id, parentID, event ) => {
		event.stopPropagation();
		const action = removeExpenseGroupChild({ id, parentID });

		store.dispatch( action );
	};

	/**
	 * On click of a child. We want to edit it, so we send the ID
	 * of the child over to the action
	 */
	const childClickHandler = ( id, editing ) => ( editing ) ?
		false
		:
		store.dispatch( editEntity({ id }));

	/**
	 * Handling the change events that occur on edit items when a
	 * user updates the values.
	 */
	const childChangeHandler = ( id, event ) => store.dispatch(updateEntity({
		id,
		[ event.target.name ] : event.target.value
	}));


	return (
		<Table>
			<TableHead>
				<TableRow variant="header">
					{ Object.keys( tableDataRef ).map( ( dataProp, index ) => (
						<TableCell key={index} padding="none">{ capitalizeFirstLetter( dataProp ) }</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{ childrenIDs.map( ( dataId, index ) => (
					<Expense_Group_Child_New
						key={index}
						childID={dataId}
						childClickHandler={childClickHandler}
						childChangeHandler={childChangeHandler}
						childRemoveHandler={childRemoveHandler}
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
};

Expense_Group_Child_Table.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles( styles )( Expense_Group_Child_Table );