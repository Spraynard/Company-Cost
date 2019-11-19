import { PropTypes } from "prop-types";

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Custom Imports
import Expense_Group from "./Expense_Group";
import Add_Expense_Group_UI_Button from "./Buttons/Add_Expense_Group_UI_Button";

const styles = theme => ({
	toolbar : theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		height: '100vh',
	},

})

/**
 * Window that contains expense groups.
 * @param classes - styling classes
 * @param addNew - Component used to add a new expense group to the list.
 * @param props - Rest of passed in props.\
 */
const Groups_Window = ({ classes, addNew : [], ...props}, { store }) => {

	const {
		expense_group_by_id,
	} = store.getState();

	const expense_group_grid_elements = Object.keys(expense_group_by_id).map(expense_group_id => {
		const expense_group_data = expense_group_by_id[expense_group_id];
		return (
			<Grid key={expense_group_id} item xs={12} md={6} lg={4}>
				<Expense_Group id={expense_group_id} {...expense_group_data} />
			</Grid>
		)
	}).concat([
		<Grid item xs={12} md={6} lg={4}><Add_Expense_Group_UI_Button action={}/></Grid>
	])

	return (
		<main className={classes.content}>
		<Grid container spacing={4} className={classes.toolbar}>
			{expense_group_grid_elements}
		</Grid>
		</main>
	);
};

Groups_Window.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Groups_Window);