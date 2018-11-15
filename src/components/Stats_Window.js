import { PropTypes } from "prop-types";
import { addExpenseGroup } from '../actions';


// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

// Material UI Styles Import
import { withStyles } from '@material-ui/core/styles';

// Material UI Icons
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import AddCircle from '@material-ui/icons/AddCircle';

// Component Styles
const styles = theme => ({
	root: {

	},
	flex: {
		'display' : 'flex'
	},
	vert : {
		'flexDirection' : 'column',
	},
	buttonStyles : {
		'marginLeft' : 'auto'
	},
	buttonIconStyles : {
		'marginRight' : '5px'
	},
	headerTextStyles : {
		'color' : theme.palette.primary.contrastText
	},
})

const Stats_Window = ( props, { store } ) => {

	const {
		expense_groups,
		expense_group_children,
		expense_group_child_by_id
	} = store.getState();

	const { classes } = props;

	const total_expense_cost = expense_group_children.reduce(( accumulator, currentValue ) => {
		let expense_group_child = expense_group_child_by_id[currentValue];
		let expense_group_child_cost = expense_group_child.cost;
		let expense_group_child_costUOM = expense_group_child.costUOM;

		return accumulator + expense_group_child_cost;
	}, 0);

	return (
		<AppBar position="sticky">
		<Toolbar>
			<Typography
				component="span"
				variant="h6"
				color="inherit"
			>
				Company Cost
			</Typography>
			<FormControl>
				<InputBase
					placeholder="Enter Name of Workbench"
					color="secondary"
				/>
			</FormControl>
			{
				/**
				 * Stats for the app go here.
				 * In another version they should go within the menu or something
				 * when we size down.
				 */
			}
			<div className={classes.flex}>
				<Typography component="h6" variant="h6" color="inherit">Stats:</Typography>
				<div className={classes.flex}>
					<div className={`${classes.flex} ${classes.vert} stats-item`}>
						<Typography variant="body1" color="inherit">Expense Groups</Typography>
						<Typography variant="body2" color="inherit">{ expense_groups.length }</Typography>
					</div>
					<div className={`${classes.flex} ${classes.vert} stats-item`}>
						<Typography variant="body1" color="inherit">Expenses</Typography>
						<Typography variant="body2" color="inherit">{ expense_group_children.length }</Typography>
					</div>
					<div className={`${classes.flex} ${classes.vert} stats-item`}>
						<Typography variant="body1" color="inherit">Total Cost</Typography>
						<Typography variant="body2" color="inherit">{ total_expense_cost }</Typography>
					</div>
				</div>
			</div>
			<Button
				color='secondary'
				variant='contained'
				size='large'
				className={classes.buttonStyles}
				onClick={() => store.dispatch(addExpenseGroup({
					"title" : "Expense Group"
				}))}
			>
				<AddCircle className={classes.buttonIconStyles}/>
				<Typography
					variant="button"
				>
					Add Expense Group
				</Typography>
			</Button>
		</Toolbar>
		</AppBar>
	);
};

Stats_Window.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Stats_Window);