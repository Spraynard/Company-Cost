import PropTypes from "prop-types";
import Entity_Edit_Field from "../Expense_Group_Edit_Form";

import {
	updateEntity
} from "../../actions/entity_actions";

// MaterialUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root : {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		minHeight: "250px"
	},
	editButton : {
		cursor : "context-menu"
	},
	expenseGroupInformation : {
		marginBottom : theme.spacing(1)
	},
	rightAlign: {
		textAlign: "right"
	},
	leftAlign: {
		textAlign: "left"
	},
	buttonsContainer: {
		marginBottom : theme.spacing(1)
	},
	removeButton : {
		marginLeft : "auto"
	}
});

const Expense_Group = ( props ) => {

	const updateExpenseGroupEdit = ( event ) => {
		store.dispatch(updateEntity({
			id : props.id,
			[event.target.name] : event.target.value
		}));
	};

	const {
		classes,
		children,
		buttons_primary,
		buttons_admin,
		num_children, // If our components children should be displayed. Provide a fallback if false
		editing_view,
		is_editing,
		...editEntityFieldProps
	} = props;

	const rendered_buttons_admin = buttons_admin.map((item, index) =>
		<Grid
			item
			key={`admin-button-grid-${index}`}
			className={(index) ? classes.removeButton : ""}>{item}</Grid>
	);

	return ( is_editing ) ? ( props.edit ) ?
		<Paper className={`expense-group-content ${classes.root}`}>
			{editing_view}
			<Entity_Edit_Field
				{ ...editEntityFieldProps }
				updateListener={updateExpenseGroupEdit}
			/>
		</Paper>
		:
		<Paper className={`expense-group-content ${classes.root} ${classes.rightAlign}`}>
			<Grid container className={classes.buttonsContainer}>{rendered_buttons_admin}</Grid>
			<Typography align="left" component="h2" variant="h5" className="expense-group-name">{props.title}</Typography>
			<Typography align="left" component="p" variant="subtitle2" className="expense-group-description">{props.description}</Typography>
			<hr style={{marginBottom: "0px"}}/>
			<Typography align="left" component="h6" variant="h6">
				{`${num_children} ${(num_children === 1) ? "Expense" : "Expenses"}`}
			</Typography>
			{ (num_children) ?
				children
				:
				<Typography align="left" component="p" variant="subtitle1">There are currently no expenses</Typography>
			}
			{/** Add an expense to the expense group **/}
			{buttons_primary}
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