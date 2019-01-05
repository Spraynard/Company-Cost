import TableCell from "@material-ui/core/TableCell";
import InputBase from "@material-ui/core/InputBase";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Expense_Group_Child_Edit_View =  ( props ) => {
	const {
		id,
		childDisplayData,
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
			"day",
			"hour",
			"week",
			"month",
			"year"
		]
	};

	// Take child Display data and make an object that contains the data with each of the different types
	// that are required in order to modify said data.

	// First Move all the current data to
	console.log( "Child State Data", childStateData );
	console.log( "Child Display Data", childDisplayData );
	console.log( "Child Edit State Data", childEditStateData );

	return (
		<TableRow className="expense-group-child" data-id={id} onClick={() => childClickHandler( id, childStateData.edit )}>
			{Object.keys( childEditStateData ).map(
				( childDataKey, index ) => {
					return (
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
							{ ( editValueTypes[childDataKey] === "select" ) ?
								<Select
									value={childEditStateData[childDataKey]}
									name={childDataKey}
									onChange={( event ) => childDataChangeHandler( id, event )}
								>
									{ selectValues[childDataKey].map((item, index) =>
										<MenuItem key={index} value={item}>{item}</MenuItem> )}
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
					);
				}
			)}
		</TableRow>
	);
};

export default Expense_Group_Child_Edit_View;