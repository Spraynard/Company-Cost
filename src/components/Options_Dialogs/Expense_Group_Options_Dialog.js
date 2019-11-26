import Options_Dialog from "./Options_Dialog";
import { reduceToBooleanByBoolean } from "../../helpers/helpers";

/**
 * Creating this component to compose over Options_Dialog
 * in order to show the options data for the current Expense Group
 * in which we are trying to change options.
 *
 * Basically, we perform all the data handling through this component
 * and just feed it to the dialog.
 * @param [object] options - An object containing the options of each specific expense group.
 * @param [object] groups - An object containing the data of each group
 */
const Expense_Group_Options_Dialog = ({ options, groups, update_options_action, dialog_close_action, readOnlyGroupData,...props }) => {

	// Is there an expense group saying to open this dialog?
	const isDialogOpen = reduceToBooleanByBoolean(Object.keys(options), [options, "dialog_open"]);

	// Adds the ID as a part of the object because we normally only have the id as a
	// reference of the object
	const contextualGroupOptions = Object.keys(groups)
		.map( group_id => ({ id : group_id, ...groups[group_id]}))
		.filter( group => options[group.id].dialog_open )
		.shift() || null;

	// eslint-disable-next-line no-unused-vars
	const { dialog_open, ...editable_options_values } = (contextualGroupOptions) ?
		options[contextualGroupOptions.id]
		:
		{ dialog_open: false };

	return (
		<Options_Dialog
			open={isDialogOpen}
			options_values={editable_options_values}
			onChange={( contextualGroupOptions ) ? update_options_action(contextualGroupOptions.id ) : null}
			onClose={( contextualGroupOptions ) ? dialog_close_action(contextualGroupOptions.id ) : null}
			options_values_labels={readOnlyGroupData["expense_group_options_labels"]}
			options_values_list={readOnlyGroupData["expense_group_options"]}
			title={(contextualGroupOptions) ? contextualGroupOptions.title : ""}
			{ ...props }
		/>
	);
};

export default Expense_Group_Options_Dialog;