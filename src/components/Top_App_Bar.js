// Prop Type Checks on Render
import { PropTypes } from "prop-types";

// Actions
import {
	addExpenseGroup,
	openAppOptionsDialog,
	closeAppOptionsDialog,
	editApplicationOption
} from '../actions';

// Read Only Data
import readOnlyApplicationData from "../../data/read_only_application_data.json";

// Helper Functions
import {
	obtainChildCostTotal
} from '../helpers/helpers';

// UI Components
import { Options_Dialog } from "./Options_Dialog";

import Stats_Window from "./Stats_Window";

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

// Material UI Styles Import
import { withStyles } from '@material-ui/core/styles';

// Material UI Icons
import MoreVert from "@material-ui/icons/MoreVert";
import AddCircle from '@material-ui/icons/AddCircle';

// Component Styles
const styles = theme => ({
	appButtonMargin : {
		marginLeft : theme.spacing.unit
	},
	flexEnd : {
		alignSelf : 'flex-end'
	},
	marginLeft : {
		'marginLeft' : 'auto'
	},
	buttonIconStyles : {
		'marginRight' : '5px'
	},
	headerTextStyles : {
		'color' : theme.palette.primary.contrastText
	},
	marginRight : {
		marginRight : theme.spacing.unit * 2
	},
	siteTitle : {
		fontFamily : theme.typography.siteTitle.fontFamily,
		color : theme.palette.secondary.contrastText
	}
})

const Top_App_Bar = ( props, { store } ) => {

	const {
		expense_groups,
		expense_group_children,
		expense_group_child_by_id,
		application_options
	} = store.getState();

	const { classes } = props;
	const { dialog_open, ...optionsValues } = application_options;

	const total_expense_cost = obtainChildCostTotal(
		expense_group_children,
		expense_group_child_by_id,
		application_options
	);

	const updateApplicationOptions = ( event ) => {
		store.dispatch(editApplicationOption({
			[event.target.name] : event.target.value
		}));
	}

	return (
		<AppBar position="sticky">
		<Toolbar>
			<Typography
				component="span"
				variant="h3"
				className={`${classes.marginRight} ${classes.siteTitle}`}
			>
				Company Cost
			</Typography>
			<Button
				color="secondary"
				variant="outlined"
				size="small"
				className={`${classes.marginLeft}`}
				onClick={() => store.dispatch(openAppOptionsDialog())}
			>
				<MoreVert />
			</Button>
			<Options_Dialog
				open={application_options.dialog_open}
				title="Application"
				options_values={optionsValues}
				onClose={() => store.dispatch(closeAppOptionsDialog())}
				onChange={updateApplicationOptions}
				options_values_labels={readOnlyApplicationData["application_options_labels"]}
				options_values_list={readOnlyApplicationData['application_options']}
			/>
			<Button
				color='secondary'
				variant='contained'
				size='large'
				className={classes.appButtonMargin}
				onClick={() => store.dispatch(addExpenseGroup({
					"title" : "Expense Group"
				}))}
			>
				<AddCircle className={classes.buttonIconStyles}/>
				<Typography
					variant="button"
					color="inherit"
				>Add Expense Group</Typography>
			</Button>
			<Stats_Window
				expenses={expense_group_children.length}
				expenseGroups={expense_groups.length}
				totalCost={total_expense_cost.costFormat()}
				applicationCostUnitOfMeasurement={application_options.costUOM}
			/>
		</Toolbar>
		</AppBar>
	);
};

Top_App_Bar.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Top_App_Bar);