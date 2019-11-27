// Material UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

/**
 * Table component to display an expense group's children.
 *
 * @param {object} props Props passed
 */
const Expense_Group_Table = ( props ) => {

	const { children, children_total_cost, headers, isChildInEdit, parentGroupCostUOM } = props;

	const header = <TableHead><TableRow variant="header">{
		headers.map((header, index) => <TableCell key={`table-header-${index}`}>{header}</TableCell>)
	}</TableRow></TableHead>
;
	const footer = <TableFooter style={{ opacity : ( isChildInEdit ) ? 0 : 1}}>
		<TableRow variant="footer">
			<TableCell>Total Cost:</TableCell>
			<TableCell>{`$${(children_total_cost) ? children_total_cost.costFormat() : "0"} per ${parentGroupCostUOM}`}</TableCell>
			<TableCell>Expenses:</TableCell>
			<TableCell>{children.length}</TableCell>
		</TableRow>
	</TableFooter>;

	return (
		<Table size="small">
			{header}
			<TableBody>{children}</TableBody>
			{footer}
		</Table>
	);
};

export default Expense_Group_Table;