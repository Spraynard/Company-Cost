import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CloseIcon from "@material-ui/icons/Close";

const Expense_Group_Child_Default_View = props => {

	const {
		child_display_data,
		child_remove_handler,
		classes,
	} = props;

	return Object.keys(child_display_data).map(
		(childDataKey, index) => (
			<TableCell data-id={props.id} key={index}>
				{(childDataKey === "delete") ?
					<CloseIcon
						className={classes.deleteButton}
						onClick={child_remove_handler}
					/>
					:
					child_display_data[childDataKey]
				}
			</TableCell>
		)
	);
};

export default Expense_Group_Child_Default_View;