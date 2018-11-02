import { PropTypes } from "prop-types";
import { addExpenseGroup } from '../actions';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';

/**
 * Pure functions only please!
 */
const styles = theme => ({
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

	const { expense_groups } = store.getState();
	const { classes } = props;
	console.log( classes.buttonStyles );
	return (
		<AppBar position="sticky">
		<Toolbar>
			<Typography
				variant="h6"
				color="inherit"
			>
				<span>Company Cost</span>
			</Typography>
			<span>You have { expense_groups.length } expense groups</span>
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