/**
 * Stats for the app go here.
 * In another version they should go within the menu or something
 * when we size down.
 */

// Material UI Styles Import
import { withStyles } from '@material-ui/core/styles';

// Material UI Components
import Typography from '@material-ui/core/Typography';

// Component Stylings
const styles = theme => ({
	root : {
		padding: theme.spacing.unit,
		margin: theme.spacing.unit,
		marginRight: 0,
		borderRadius : theme.shape.borderRadius,
		background: theme.palette.primary.light,
	},
	flex : {
		display: 'flex'
	},
	// Flex vert with padding on the element.
	vert : {
		'flexDirection' : 'column',
		'textAlign' : 'center',
		'padding' : theme.spacing.unit / 2,
		'& + &' : {
			marginLeft: theme.spacing.unit * 2
		}
	},
	statsItemHeader : {
		borderBottom : `2px solid ${theme.palette.primary.main}`
	},
	statsItemValue : {
		paddingTop : theme.spacing.unit
	},
});

const Stats_Window = ( props ) => {

	const {
		classes,
		expenses,
		expenseGroups,
		totalCost,
		applicationCostUnitOfMeasurement
	} = props;

	return (
	<div className={`${classes.root} ${classes.flex}`}>
		<div className={`${classes.flex} ${classes.vert}`}>
			<Typography variant="body1" color="inherit" className={classes.statsItemHeader}>Groups</Typography>
			<Typography variant="body2" color="inherit" className={classes.statsItemValue}>{expenseGroups}</Typography>
		</div>
		<div className={`${classes.flex} ${classes.vert}`}>
			<Typography variant="body1" color="inherit" className={classes.statsItemHeader}>Expenses</Typography>
			<Typography variant="body2" color="inherit" className={classes.statsItemValue}>{expenses}</Typography>
		</div>
		<div className={`${classes.flex} ${classes.vert}`}>
			<Typography variant="body1" color="inherit" className={classes.statsItemHeader}>Total Cost</Typography>
			<Typography variant="body2" color="inherit" className={classes.statsItemValue}>${totalCost}/{applicationCostUnitOfMeasurement}</Typography>
		</div>
	</div>
)}

export default withStyles(styles)(Stats_Window);
