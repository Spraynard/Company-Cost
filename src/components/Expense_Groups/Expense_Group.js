import PropTypes from "prop-types";
import Entity_Manipulation_Button from "../Buttons/Entity_Manipulation_Button";
import Entity_Edit_Field from "../Entity_Edit_Field";
import Expense_Group_Child_Table from "./Expense_Group_Child_Table";
import Options_Dialog from "../Options_Dialogs/Options_Dialog";

// Redux Actions
import {
	openExpenseGroupOptionsDialog,
	closeExpenseGroupOptionsDialog,
	removeExpenseGroup,
	addExpenseGroupChild,
} from "../../actions/expense_group_actions";

import {
	editEntityOption,
	editEntity,
	updateEntity
} from "../../actions/entity_actions";

import { obtainChildCostTotal} from "../../helpers/helpers";
import readOnlyGroupData from "../../../data/read_only_group_data.json";

// MaterialUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DeleteForever from "@material-ui/icons/DeleteForever";
import MoreHoriz from "@material-ui/icons/MoreHoriz";

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

const Expense_Group = ( props, { store } ) => {
	const {
		expense_group_children,
		expense_group_child_by_id,
		expense_group_options,
		expense_group_entity_edit,
	} = store.getState();

	const updateExpenseGroupEdit = ( event ) => {
		store.dispatch(updateEntity({
			id : props.id,
			[event.target.name] : event.target.value
		}));
	};

	const updateExpenseGroupOptions = ( event ) => {
		store.dispatch(editEntityOption({
			id : props.id,
			[event.target.name] : event.target.value
		}));
	};

	const {
		classes,
		children,
		buttons_primary,
		buttons_admin,
		buttons_editing,
		...editEntityFieldProps } = props;

	const childrenOfExpenseGroup = expense_group_children.filter( expense_group_child_id => {
		return expense_group_child_by_id[expense_group_child_id].parentID === props.id;
	});

	let expense_group_options_object = expense_group_options[props.id];

	let associatedChildrenCost = obtainChildCostTotal(
		childrenOfExpenseGroup,
		expense_group_child_by_id,
		expense_group_options_object
	);

	const { dialog_open, ...optionsValues } = expense_group_options_object;

	return ( props.edit ) ?
		<Paper className={`expense-group-content ${classes.root}`}>
			<Entity_Edit_Field { ...editEntityFieldProps } updateListener={updateExpenseGroupEdit}/>
		</Paper>
		:
		<Paper className={`expense-group-content ${classes.root} ${classes.rightAlign}`}>
			<Grid container className={classes.buttonsContainer}>
				{
				/**
				 * If a group has options available, display a field that allows us to handle changes
				 * to these options
				 */
				}
				<Grid item>
					<Entity_Manipulation_Button
						action={openExpenseGroupOptionsDialog({ id: props.id })}
						icon={<MoreHoriz />}
						variant="outlined"
					/>
				</Grid>
				<Grid item className={classes.removeButton}>
					<Entity_Manipulation_Button
						action={ removeExpenseGroup({
							"id" : props.id
						})}
						icon={<DeleteForever />}
						variant="outlined"
					/>
				</Grid>
			</Grid>
			<Typography align="left" component="h2" variant="h5" className="expense-group-name">{props.title}</Typography>
			<Typography align="left" component="p" variant="subtitle2" className="expense-group-description">{props.description}</Typography>
			<hr style={{marginBottom: "0px"}}/>
			<Typography align="left" component="h6" variant="h6">{`${childrenOfExpenseGroup.length} ${(! childrenOfExpenseGroup.length || childrenOfExpenseGroup.length > 1 ) ? "Expenses" : "Expense"}`}</Typography>
			{ childrenOfExpenseGroup.length ?
				<Expense_Group_Child_Table
					childrenIDs={childrenOfExpenseGroup}
					childrenByIDState={expense_group_entity_edit}
					childrenTotalCost={associatedChildrenCost}
					parentGroupCostUOM={optionsValues.costUOM}
				/>
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