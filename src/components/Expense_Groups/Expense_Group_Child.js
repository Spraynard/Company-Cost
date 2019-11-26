//-- Helpers

// import "./styles/Expense_Group_Child.css";

// React
import { PropTypes } from "prop-types";

// Custom
import {
	obtainSelectProperties,
	capitalizeFirstLetter,
	// moneyFormat
} from "../../helpers/helpers";

import {
	tableDataRef,
	expenseGroupChildEditDataRef
} from "../../dataReferenceObjects";

//** Components **//

import Expense_Group_Child_Default_View from "./Expense_Group_Child_Default_View";
import Expense_Group_Child_Edit_View from "./Expense_Group_Child_Edit_View";

//-- Material UI

// Styles
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
	overflowHandler : {
		whiteSpace : "nowrap",
		overflow : "hidden",
		textOverflow : "ellipsis"
	},
	// Deletes expense from expense group
	deleteButton : {
		cursor : "pointer"
	}
});

const Expense_Group_Child = ( props, { store } ) => {

	const {
		expense_group_child_by_id,
		expense_group_entity_edit
	} = store.getState();

	const {
		childID,
		classes,
		childClickHandler,
		childDataChangeHandler,
		childRemoveHandler,
	} = props;

	const fullChildData = expense_group_child_by_id[childID];
	const fullChildEditData = expense_group_entity_edit[childID];

	const { edit } = fullChildData;

	// Transform param allows us to take the input data and perform a functional transform on it.
	const displayChildData = obtainSelectProperties( tableDataRef, fullChildData, {
		transform : {
			cost : cost => `$${cost.costFormat()}`,
			costUOM : capitalizeFirstLetter,
		}
	});

	const editableChildData = obtainSelectProperties( expenseGroupChildEditDataRef, fullChildData );

	return (
		( edit ) ?
			<Expense_Group_Child_Edit_View
				id={childID}
				childDisplayData={editableChildData}
				childStateData={fullChildData}
				childEditStateData={fullChildEditData}
				childDataChangeHandler={childDataChangeHandler}
				childClickHandler={childClickHandler}
			/>
			:
			<Expense_Group_Child_Default_View
				id={childID}
				childClickHandler={childClickHandler}
				childDisplayData={displayChildData}
				childStateData ={fullChildData}
				childRemoveHandler={childRemoveHandler}
				classes={classes}
			/>
	);
};


Expense_Group_Child.defaultProps = {
	title : "Expense"
};

Expense_Group_Child.propTypes = {
	childID : PropTypes.string.isRequired
};

Expense_Group_Child.contextTypes = {
	store : PropTypes.object.isRequired,
};

export default withStyles(styles)(Expense_Group_Child);