import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CloseIcon from "@material-ui/icons/Close";

const Expense_Group_Child_Default_View = props => {

	const {
		id,
		childStateData,
		childDisplayData,
		childClickHandler,
		childRemoveHandler,
		classes,
	} = props;

	return (
		<TableRow className="expense-group-child" data-id={id} onClick={() => childClickHandler( id, childStateData.edit )}>
			{
			// Default UI Display
				Object.keys(childDisplayData).map(
					( childDataKey, index ) => (
						<TableCell key={index} padding="none">
							{ ( childDataKey === "delete" ) ?
								<CloseIcon
									className={classes.deleteButton}
									onClick={( event ) => childRemoveHandler( id, childStateData.parentID, event )}
								/>
								:
								childDisplayData[childDataKey]
							}
						</TableCell>
					)
				)
			}
		</TableRow>
	);
};

export default Expense_Group_Child_Default_View;