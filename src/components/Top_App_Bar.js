// Prop Type Checks on Render
import { PropTypes } from "prop-types";

// Actions
import { addExpenseGroup } from "../actions/expense_group_actions"
import { openAppOptionsDialog } from "../actions/application_actions";

// Read Only Data

// Helper Functions
import {
	obtainChildCostTotal
} from "../helpers/helpers";

// UI Components
import Stats_Window from "./Stats_Window";
import Open_Stats_Drawer_Button from "./Buttons/Open_Stats_Drawer_Button";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// Material UI Styles Import
import { withStyles } from "@material-ui/core/styles";

// Material UI Icons
import AddCircle from "@material-ui/icons/AddCircle";

// Component Styles
const styles = theme => ({
	appButtonMargin : {
		marginLeft : theme.spacing(1)
	},
	flexEnd : {
		alignSelf : "flex-end"
	},
	marginLeft : {
		"marginLeft" : "auto"
	},
	buttonIconStyles : {
		"marginRight" : "5px"
	},
	headerTextStyles : {
		"color" : theme.palette.primary.contrastText
	},
	marginRight : {
		marginRight : theme.spacing(2)
	},
	siteTitle : {
		fontFamily : theme.typography.siteTitle.fontFamily,
		color : theme.palette.secondary.contrastText
	}
});

const Top_App_Bar = ( props, { store } ) => {

	const {
		expense_groups,
		expense_group_children,
		expense_group_child_by_id,
		application_options
	} = store.getState();

	const { classes } = props;

	const total_expense_cost = obtainChildCostTotal(
		expense_group_children,
		expense_group_child_by_id,
		application_options
	);

	return (
		<AppBar position="sticky">
			<Toolbar>
				<Typography
					className={`${classes.marginRight} ${classes.siteTitle}`}
					component="span"
					variant="h3"
				>
				Company Cost
				</Typography>
				<Button
					color='secondary'
					variant='contained'
					size='large'
					className={`${classes.appButtonMargin} ${classes.marginLeft}`}
					onClick={() => store.dispatch(addExpenseGroup({
						"title" : "Expense Group"
					}))}
				>
					<AddCircle className={classes.buttonIconStyles}/>
					<Typography
						color="inherit"
						variant="button"
					>Add Expense Group</Typography>
				</Button>
				<Open_Stats_Drawer_Button display={{ xs : 'block', 'md' : 'none' }} />
				<Stats_Window
					applicationCostUnitOfMeasurement={application_options.costUOM}
					display={{ xs : 'none', 'md' : 'block' }}
					expenseGroups={expense_groups.length}
					expenses={expense_group_children.length}
					onClick={() => store.dispatch(openAppOptionsDialog())}
					totalCost={total_expense_cost.costFormat()}
				/>
			</Toolbar>
		</AppBar>
	);
};

Top_App_Bar.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Top_App_Bar);