import TableCell from "@material-ui/core/TableCell";
import InputBase from "@material-ui/core/InputBase";
import TableRow from "@material-ui/core/TableRow";
const Expense_Group_Child_Edit_View =  ( props ) => {
	const {
		id,
		childDisplayData,
		childStateData,
		childEditStateData,
		childDataChangeHandler,
		childClickHandler,
	} = props;

	return (
		<TableRow className="expense-group-child" data-id={id} onClick={() => childClickHandler( id, childStateData.edit )}>
			{// Edit Mode Display
				Object.keys( childDisplayData ).map(
					( childDataKey, index ) => (
						<TableCell
							key={index}
							padding="none"
							colSpan={
								(
									Object.keys(childDisplayData).length < 4 &&
							Object.keys(childDisplayData).indexOf(childDataKey) === Object.keys(childDisplayData).length - 1
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
				)}
		</TableRow>
	);
};

export default Expense_Group_Child_Edit_View;