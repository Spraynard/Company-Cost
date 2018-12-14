// Custom UI Components
import Expense_Group_Child_New from "./Expense_Group_Child_New";

// Material UI Components
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

// Material UI Styles
import { withStyles } from "@material-ui/core/styles";

// Helpers
import {
	capitalizeFirstLetter,
	obtainSelectProperties
} from "../helpers/helpers";

const styles = {

}
const Expense_Group_Child_Table = ( props ) => {

	const { childrenIDs, childrenTotalCost, classes, ...extraProps } = props;

	const tableDataObject = {
		title : "",
		cost : "",
		costUOM : ""
	};

	return (
		<Table>
			<TableHead>
				<TableRow variant="header">
					{ Object.keys( tableDataObject ).map( ( dataProp, index ) => (
					<TableCell key={index} padding="none">{ capitalizeFirstLetter( dataProp ) }</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{ childrenIDs.map( ( dataId, index ) => (
					<Expense_Group_Child_New key={index} childID={dataId} dataReferenceObject={tableDataObject}/>
				))}
			</TableBody>
			<TableFooter>
			{/** Total # and Cost of expenses **/}
				<TableRow variant="footer">
					<TableCell padding="none"># Of Expenses</TableCell>
					<TableCell padding="none">{childrenIDs.length}</TableCell>
				</TableRow>
				<TableRow variant="footer">
					<TableCell padding="none">Total Cost</TableCell>
					<TableCell padding="none">{`$${childrenTotalCost.costFormat()}`}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
};

export default withStyles( styles )( Expense_Group_Child_Table );