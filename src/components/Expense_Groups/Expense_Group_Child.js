import { PropTypes } from "prop-types";

// Custom
import {
	obtainSelectProperties,
	capitalizeFirstLetter,
} from "../../helpers/helpers";

import {
	tableDataRef,
	editDataRef
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

const Expense_Group_Child = ( props ) => {

	const {
		classes,
		child_click_handler,
		child_data_change_handler,
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

	const child_edit_data = edit_data[id];
	const editableChildData = obtainSelectProperties( editDataRef, child_edit_data );

	return (
		( edit ) ?
			<Expense_Group_Child_Edit_View
				id={id}
				child_display_data={editableChildData}
				child_state_data={child_data}
				child_edit_state_data={child_edit_data}
				child_data_change_handler={child_data_change_handler}
				child_click_handler={child_click_handler}
			/>
			:
			<Expense_Group_Child_Default_View
				id={id}
				child_click_handler={child_click_handler}
				child_display_data={display_child_data}
				child_state_data ={child_data}
				child_remove_handler={child_remove_handler}
				classes={classes}
			/>
	);
};


Expense_Group_Child.defaultProps = {
	title : "Expense"
};

Expense_Group_Child.propTypes = {
	id : PropTypes.string.isRequired
};

export default withStyles(styles)(Expense_Group_Child);