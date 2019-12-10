import { PropTypes } from "prop-types";
import Editable from "../Generic/Editable";
import React from "react";
import Remove_Expense_Group_Child_Button from "../Buttons/Remove_Expense_Group_Child_Button";

import { expense_group_child_keydown_event_listener } from "../../event_handlers";

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

const styles = () => ({
	root: {
		// overflow : "hidden",
		// textOverflow : "ellipsis",
		// whiteSpace : "nowrap",
		cursor: "pointer"
	},
});

const Expense_Group_Child = React.memo(( props ) => {

	const {
		classes,
		child_update_handler,
		child_remove_handler,
		child_data,
		edit_data,
		edit_context_handler,
		...other
	} = props;

	const { id, edit } = child_data;

	/**
	 * When a user has an expense group child focused
	 * through tab, they should be able to press the "space"
	 * key, or the enter key, and open up the edit context of our
	 * child.
	 * @param {object} event keyDown event
	 */
	const handleKeyDown = expense_group_child_keydown_event_listener(props);


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
			component="tr"
			data-id={id}
			editView={<Expense_Group_Child_Edit_View
				id={id}
				child_display_data={editableChildData}
				child_state_data={child_data}
				child_edit_state_data={child_edit_data}
				child_update_handler={child_update_handler}
				edit_context_handler={edit_context_handler}
			/>}
			isEdit={edit}
			onKeyDown={handleKeyDown}
			onClick={(e) => edit_context_handler(e)}
			tabIndex={0}
			className={classes.root}
			{...other}>
			<Expense_Group_Child_Default_View
				id={id}
				child_display_data={display_child_data}
				child_state_data={child_data}
				delete_button={<Remove_Expense_Group_Child_Button onClick={child_remove_handler}/>}
				edit_context_handler={edit_context_handler}
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