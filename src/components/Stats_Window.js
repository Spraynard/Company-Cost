/**
 * Stats for the app go here.
 * In another version they should go within the menu or something
 * when we size down.
 */

// Prop Type Checks on Render
import { PropTypes } from "prop-types";

import * as readOnlyApplicationData from "../../data/read_only_application_data";

// Material UI Styles Import
import { withStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

// Material UI Components
import Typography from "@material-ui/core/Typography";

// Custom Components
import { Options_Dialog } from "./Options_Dialog";

// Actions
import {
	closeAppOptionsDialog,
	editApplicationOption
} from "../actions/application_actions";

// Component Stylings
const styles = theme => ({
	root : {
		padding: theme.spacing.unit,
		margin: theme.spacing.unit,
		marginRight: 0,
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
		"padding" : theme.spacing.unit / 2,
		"& + &" : {
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

const Stats_Window = ( props, { store } ) => {

	const {
		classes,
		expenses,
		expenseGroups,
		totalCost,
		applicationCostUnitOfMeasurement,
		onClick
	} = props;

	const {
		application_options
	} = store.getState();

	const updateApplicationOptions = ( event ) => {
		store.dispatch(editApplicationOption({
			[event.target.name] : event.target.value
		}));
	};

	const { dialog_open, ...optionsValues } = application_options;

	const handleClose = () => store.dispatch(closeAppOptionsDialog());

	return (
		<div>
			<div onClick={onClick} className={`${classes.root} ${classes.flex}`}>
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
			<Options_Dialog
				open={dialog_open}
				title="Application"
				options_values={optionsValues}
				onClose={handleClose}
				onChange={updateApplicationOptions}
				options_values_labels={readOnlyApplicationData["application_options_labels"]}
				options_values_list={readOnlyApplicationData["application_options"]}
			/>
		</div>
	);
};

Stats_Window.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Stats_Window);
