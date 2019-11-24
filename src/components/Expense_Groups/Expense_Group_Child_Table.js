// Material UI Components
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

// Material UI Styles
import { withStyles } from "@material-ui/core/styles";

const styles = {};

const Expense_Group_Child_Table = ( props ) => {

	const { children, children_total_cost, headers, parentGroupCostUOM } = props;


	return (
		<Table>
			<TableHead>
				<TableRow variant="header">{headers.map((header, index) => (header) ? <TableCell key={`table-header-${index}`}>{header}</TableCell> : "")}</TableRow>
			</TableHead>
			<TableBody>
				{children}
			</TableBody>
			<TableFooter>
				{/** Total # and Cost of expenses **/}
				<TableRow variant="footer">
					<TableCell padding="none">Total Cost</TableCell>
					<TableCell padding="none">{`$${(children_total_cost) ? children_total_cost.costFormat() : "0"} per ${parentGroupCostUOM}`}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default withStyles( styles )( Expense_Group_Child_Table );