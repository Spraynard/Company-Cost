import TableCell from "@material-ui/core/TableCell";
import React from "react";

/**
 * Row of TableCells that displays expense group child through a table setting.
 * @param {object} props Passed Props
 */
const Expense_Group_Child_Default_View = props => {

	const {
		child_display_data,
		delete_button,
	} = props;

	const child_row_cells = Object.keys(child_display_data).map((childDataKey, index) =>
		<TableCell data-id={props.id} key={index}>{child_display_data[childDataKey]}</TableCell>
	).concat(<TableCell data-id={props.id}>{delete_button}</TableCell>);

	return <React.Fragment>{ child_row_cells }</React.Fragment>;
};

export default Expense_Group_Child_Default_View;