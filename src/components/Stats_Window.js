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
	root: {

	},
	appStatWindow : {
		padding: theme.spacing.unit,
		margin: theme.spacing.unit,
		marginRight: 0,
		borderRadius : theme.shape.borderRadius,
		background: theme.palette.primary.light,
	},
	appButtonMargin : {
		marginLeft : theme.spacing.unit
	},
	flex: {
		'display' : 'flex'
	},
	flexEnd : {
		alignSelf : 'flex-end'
	},
	vert : {
		'flexDirection' : 'column',
		'textAlign' : 'center',
		'padding' : theme.spacing.unit / 2
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
	statsItemHeader : {
		borderBottom : `2px solid ${theme.palette.primary.main}`
	},
	statsItemValue : {
		paddingTop : theme.spacing.unit
	}
})

const Stats_Window = ( props, { store } ) => {

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
		// console.log( event );
		store.dispatch(editApplicationOption({
			[event.target.name] : event.target.value
		}));
	}

	return (
		<AppBar position="sticky">
		<Toolbar>
			<Typography
				component="span"
				variant="h4"
				color="textSecondary"
				className={classes.marginRight}
			>
				Company Cost
			</Typography>
			<Button
				color="secondary"
				variant="outlined"
				size="small"
				className={classes.marginLeft}
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
				>
					Add Expense Group
				</Typography>
			</Button>
			{
				/**
				 * Stats for the app go here.
				 * In another version they should go within the menu or something
				 * when we size down.
				 */
			}
			<div className={`${classes.flex} ${classes.appStatWindow}`}>
				<div className={classes.flex}>
					<div className={`${classes.flex} ${classes.vert} ${classes.marginRight} stats-item`}>
						<Typography variant="body1" color="inherit" className={classes.statsItemHeader}>Groups</Typography>
						<Typography variant="body2" color="inherit" className={classes.statsItemValue}>{ expense_groups.length }</Typography>
					</div>
					<div className={`${classes.flex} ${classes.vert} ${classes.marginRight} stats-item`}>
						<Typography variant="body1" color="inherit" className={classes.statsItemHeader}>Expenses</Typography>
						<Typography variant="body2" color="inherit" className={classes.statsItemValue}>{ expense_group_children.length }</Typography>
					</div>
					<div className={`${classes.flex} ${classes.vert} ${classes.marginRight} stats-item`}>
						<Typography variant="body1" color="inherit" className={classes.statsItemHeader}>Total Cost</Typography>
						<Typography variant="body2" color="inherit" className={classes.statsItemValue}>${ total_expense_cost.costFormat() }/{ application_options.costUOM }</Typography>
					</div>
				</div>
			</div>
		</Toolbar>
		</AppBar>
	);
};

Stats_Window.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Stats_Window);