import { PropTypes } from "prop-types";
import Editable from "../Generic/Editable";
import React from "react";

// Custom
import {
	obtainSelectProperties,
	capitalizeFirstLetter,
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
import { TableRow } from "@material-ui/core";

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

const Expense_Group_Child = React.memo(( props ) => {

	const {
		classes,
		child_click_handler,
		child_edit_handler,
		child_remove_handler,
		child_data,
		edit_data
	} = props;

	const { id, edit } = child_data;


	// Transform param allows us to take the input data and perform a functional transform on it.
	const display_child_data = obtainSelectProperties( tableDataRef, child_data, {
		transform : {
			cost : cost => `$${cost.costFormat()}`,
			costUOM : capitalizeFirstLetter,
		}
	});

	const editableChildData = obtainSelectProperties( expenseGroupChildEditDataRef, edit_data );
	const child_edit_data = edit_data[id];

	return(
		<Editable
			isEdit={edit}
			component="tr"
			onClick={(e) => child_click_handler(e)}
			editView={<Expense_Group_Child_Edit_View
				id={id}
				child_display_data={editableChildData}
				child_state_data={child_data}
				child_edit_state_data={child_edit_data}
				child_edit_handler={child_edit_handler}
				child_click_handler={child_click_handler}
			/>}>
			<Expense_Group_Child_Default_View
				id={id}
				child_click_handler={child_click_handler}
				child_display_data={display_child_data}
				child_state_data={child_data}
				child_remove_handler={child_remove_handler}
				classes={classes}
			/>
		</Editable>
	);
}, (prevProps, nextProps) => (
	JSON.stringify(prevProps.child_data) === JSON.stringify(nextProps.child_data) &&
	JSON.stringify(prevProps.edit_data) === JSON.stringify(nextProps.edit_data)
));


Expense_Group_Child.defaultProps = {
	title : "Expense"
};

Expense_Group_Child.propTypes = {
	child_data : PropTypes.object.isRequired
};

export default withStyles(styles)(Expense_Group_Child);