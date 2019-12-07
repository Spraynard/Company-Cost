// Helper Functions
import { capitalizeFirstLetter } from "../../helpers/helpers";


// Material UI Components
import TableCell from "@material-ui/core/TableCell";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";

const Expense_Group_Child_Edit_View =  ( props ) => {
	const {
		child_edit_state_data,
		child_edit_handler,
	} = props;

	const edit_value_types = {
		title : "text",
		description : "textarea",
		cost : "number",
		costUOM : "select",
	};

	const select_values = {
		"costUOM" : [
			"hour",
			"day",
			"week",
			"month",
			"year"
		]
	};

	// Take child Display data and make an object that contains the data with each of the different types
	// that are required in order to modify said data.
	return Object.keys( child_edit_state_data ).map(
		( childDataKey, index ) =>
			<TableCell
				data-id={props.id}
				key={index}
				style={{paddingRight: "0"}}
				colSpan={
					(
						Object.keys(child_edit_state_data).length < 4 &&
					Object.keys(child_edit_state_data).indexOf(childDataKey) === Object.keys(child_edit_state_data).length - 1
					) ? 2 : 1
				}
			>
				{ // Loop check for "select" displays a select element filled with specific items for that option.
					( edit_value_types[childDataKey] === "select" ) ?
						<Select
							inputProps={{ "aria-label": `expense-${childDataKey}` }}
							value={child_edit_state_data[childDataKey]}
							name={childDataKey}
							onChange={( event ) => child_edit_handler( event )}
							native={true}
						>
							{ select_values[childDataKey].map((item, index) =>
								<option key={index} value={item}>{capitalizeFirstLetter(item)}</option> )}
						</Select>
						:
						<InputBase
							inputProps={{"aria-label" : `expense-${childDataKey}`}}
							name={childDataKey}
							value={child_edit_state_data[childDataKey]}
							type={edit_value_types[childDataKey]}
							onChange={( event ) => child_edit_handler( event )}
						/>
				}
			</TableCell>
	);
};
export default Expense_Group_Child_Edit_View;