/**
 * Stats for the app go here.
 * In another version they should go within the menu or something
 * when we size down.
 */

// Prop Type Checks on Render
import { PropTypes } from "prop-types";

// Material UI Styles Import
import { withStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

// Material UI Components
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";

// Component Stylings
const styles = theme => ({
	root : {
		padding: theme.spacing(1),
		margin: theme.spacing(1),
		borderRadius : theme.shape.borderRadius,
		background: theme.palette.primary.light,
		cursor : "context-menu",
		transition : theme.transitions.create([ "background" ]),
		"&:hover" : {
			background : emphasize( theme.palette.primary.light, .30 )
		}
	},
	flex : {
		display: "flex"
	},
	// Flex vert with padding on the element.
	vert : {
		"flexDirection" : "column",
		"textAlign" : "center",
		"padding" : theme.spacing(1) / 2,
		"& + &" : {
			marginLeft: theme.spacing(2)
		}
	},
	statsItemHeader : {
		borderBottom : `2px solid ${theme.palette.primary.main}`
	},
	statsItemValue : {
		paddingTop : theme.spacing(1)
	},
});

const Stats_Window = ( props ) => {

	console.log("Stats Window Props");
	console.log(props);
	const {
		classes,
		layoutClasses,
		expenses,
		expenseGroups,
		totalCost,
		applicationCostUnitOfMeasurement,
		onClick,
		...other
	} = props;

	return (
		<Box { ...other }>
			<div onClick={onClick} className={`${classes.root} ${classes.flex}`}>
				<div className={`${layoutClasses.direction} ${layoutClasses.justification}`}>
					<Typography variant="body1" color="inherit" className={classes.statsItemHeader}>Groups</Typography>
					<Typography variant="body2" color="inherit" className={classes.statsItemValue}>{expenseGroups}</Typography>
				</div>
				<div className={`${layoutClasses.direction} ${layoutClasses.justification}`}>
					<Typography variant="body1" color="inherit" className={classes.statsItemHeader}>Expenses</Typography>
					<Typography variant="body2" color="inherit" className={classes.statsItemValue}>{expenses}</Typography>
				</div>
				<div className={`${layoutClasses.direction} ${layoutClasses.justification}`}>
					<Typography variant="body1" color="inherit" className={classes.statsItemHeader}>Total Cost</Typography>
					<Typography variant="body2" color="inherit" className={classes.statsItemValue}>${totalCost}/{applicationCostUnitOfMeasurement}</Typography>
				</div>
			</div>
		</Box>
	);
};

export default withStyles(styles)(Stats_Window);
