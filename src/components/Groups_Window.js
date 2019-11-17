import { PropTypes } from "prop-types";
import Expense_Group from "./Expense_Group";

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	toolbar : theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		height: '100vh',
	},

})

const Groups_Window = (props, { store }) => {

	const {
		expense_group_by_id,
		expense_group_child_by_id
	} = store.getState();

	const { classes } = props;

	return (
		<main className={classes.content}>
		<Grid container spacing={16} className={classes.toolbar}>
		{
			Object.keys(expense_group_by_id).map( expense_group_id => {
				const expense_group_data = expense_group_by_id[expense_group_id];
				return (
					<Grid key={expense_group_id} item xs={12} md={6} lg={4}>
						<Expense_Group id={expense_group_id} { ...expense_group_data } />
					</Grid>
				)
			})
		}
		</Grid>
		</main>
	);
};

Groups_Window.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Groups_Window);