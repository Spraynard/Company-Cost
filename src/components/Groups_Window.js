// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Custom Imports
import Add_Expense_Group_UI_Button from "./Buttons/Add_Expense_Group_UI_Button";

const styles = theme => ({
	root: {
		padding: theme.spacing(3),
		height: '100%',
		width: '100%', // width and margin added to get over default material UI layout bugs
		margin: 0,
		...theme.mixins.toolbar
	}
})

/**
 * Window to display our expense groups.
 *
 * Outputs a <Grid container/> with children in a <Grid item/>
 * @param classes - styling classes
 * @param addNew - Component used to add a new expense group to the list.
 * @param props - Rest of passed in props.
 */
const Groups_Window = ({ classes, children, ...props}) => {

	const grid_elements = children.map( ( child, index ) =>
		<Grid item key={`groups-grid-elem-${index}`} xs={12} md={6} lg={4}>{child}</Grid>
	);

	return (
		<Grid container className={classes.root} component="main" spacing={2}>{grid_elements}</Grid>
	);
};

export default withStyles(styles)(Groups_Window);