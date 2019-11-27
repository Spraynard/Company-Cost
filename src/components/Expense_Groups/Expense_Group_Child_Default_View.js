import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CloseIcon from "@material-ui/icons/Close";

const Expense_Group_Child_Default_View = props => {

	const {
		id,
		child_state_data,
		child_display_data,
		child_click_handler,
		child_remove_handler,
		classes,
	} = props;

	return (
		<TableRow className="expense-group-child" data-id={id} onClick={child_click_handler}>
			{
			// Default UI Display
				Object.keys(child_display_data).map(
					( childDataKey, index ) => (
						<TableCell key={index}>
							{ ( childDataKey === "delete" ) ?
								<CloseIcon
									className={classes.deleteButton}
									onClick={child_remove_handler}
								/>
								:
								child_display_data[childDataKey]
							}
						</TableCell>
					)
				)
			}
		</TableRow>
	);
};

export default Expense_Group_Child_Default_View;