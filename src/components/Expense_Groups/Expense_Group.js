import PropTypes from "prop-types";

// MaterialUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const styles = theme => ({
	root : {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		minHeight: "250px",
		display: "flex",
		flexDirection: "column"
	},
	adminButtonsContainer: {
		display: "flex",
		marginBottom: theme.spacing(1),
		"&>button:first-child" : {
			marginRight: "auto"
		}
	},
	expenseGroupDescription: {
		marginBottom : theme.spacing() / 2
	},
	primaryButtonsContainer : {
		display : "flex",
		marginTop : "auto",
		marginLeft : "auto"
	}
});

const Expense_Group = ( props ) => {

	const {
		classes,
		children,
		buttons_primary,
		buttons_admin,
		editing_view,
		is_editing,
	} = props;

	return ( is_editing ) ?
		<Paper className={classes.root}>
			{editing_view}
		</Paper>
		:
		<Paper className={classes.root}>
			<Box className={classes.adminButtonsContainer}>{buttons_admin}</Box>
			<Typography component="h2" variant="h5" className="expense-group-name">{props.title}</Typography>
			<Typography className={classes.expenseGroupDescription}>{props.description}</Typography>
			{children}
			<Box className={classes.primaryButtonsContainer}>{buttons_primary}</Box>
		</Paper>;
};

Expense_Group.defaultProps = {
	title : "Expense Group",
	id : "NO ID"
};

Expense_Group.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Expense_Group);