import TableCell from "@material-ui/core/TableCell";
import InputBase from "@material-ui/core/InputBase";

const Expense_Group_Child_Edit_View =  ( props ) => {
	const {
		id,
		childStateData,
		childEditStateData,
		childDataChangeHandler
	} = props;

	return (
		// Edit Mode Display
		Object.keys( childStateData ).map(
			( childDataKey, index ) => (
				<TableCell
					key={index}
					padding="none"
					colSpan={
						(
							Object.keys(childStateData).length < 4 &&
							Object.keys(childStateData).indexOf(childDataKey) === Object.keys(childStateData).length - 1
						) ? 2 : 1
					}
				>
					<InputBase
						name={childDataKey}
						value={childEditStateData[childDataKey]}
						onChange={( event ) => childDataChangeHandler( id, event )}
					/>
				</TableCell>
			)
		)
	);
};

export default Expense_Group_Child_Edit_View;