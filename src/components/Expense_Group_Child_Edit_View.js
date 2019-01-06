// Helper Functions
import { capitalizeFirstLetter } from "../helpers/helpers";


// Material UI Components
import TableCell from "@material-ui/core/TableCell";
import InputBase from "@material-ui/core/InputBase";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Expense_Group_Child_Edit_View =  ( props ) => {
	const {
		id,
		childStateData,
		childEditStateData,
		childDataChangeHandler,
		childClickHandler,
	} = props;

	const editValueTypes = {
		title : "text",
		description : "textarea",
		cost : "number",
		costUOM : "select",
	};

	const selectValues = {
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
	return (
		<TableRow className="expense-group-child" data-id={id} onClick={() => childClickHandler( id, childStateData.edit )}>
			{Object.keys( childEditStateData ).map(
				( childDataKey, index ) =>
					<TableCell
						key={index}
						padding="none"
						colSpan={
							(
								Object.keys(childEditStateData).length < 4 &&
					Object.keys(childEditStateData).indexOf(childDataKey) === Object.keys(childEditStateData).length - 1
							) ? 2 : 1
						}
					>
						{ // Loop check for "select" displays a select element filled with specific items for that option.
							( editValueTypes[childDataKey] === "select" ) ?
								<Select
									value={childEditStateData[childDataKey]}
									name={childDataKey}
									onChange={( event ) => childDataChangeHandler( id, event )}
									native={true}
								>
									{ selectValues[childDataKey].map((item, index) =>
										<option key={index} value={item}>{capitalizeFirstLetter(item)}</option> )}
								</Select>
								:
								<InputBase
									name={childDataKey}
									value={childEditStateData[childDataKey]}
									type={editValueTypes[childDataKey]}
									onChange={( event ) => childDataChangeHandler( id, event )}
								/>
						}
					</TableCell>
			)}
		</TableRow>
	);
};

export default Expense_Group_Child_Edit_View;