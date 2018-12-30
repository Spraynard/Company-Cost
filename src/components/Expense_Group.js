import PropTypes from "prop-types";
import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import Entity_Edit_Field from "./Entity_Edit_Field";
// import Expense_Group_Child from "./Expense_Group_Child";
import Expense_Group_Child_Table from "./Expense_Group_Child_Table";

import {
	Options_Dialog
} from "./Options_Dialog";

import {
	editEntityOption,
	openExpenseGroupOptionsDialog,
	closeExpenseGroupOptionsDialog,
	removeExpenseGroup,
	addExpenseGroupChild,
	editEntity,
	updateEntity
} from "../actions";

import { obtainChildCostTotal} from "../helpers/helpers";
import readOnlyGroupData from "../../data/read_only_group_data.json";

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
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	editButton : {
		cursor : "context-menu"
	},
	expenseGroupInformation : {
		marginBottom : theme.spacing.unit
	},
	rightAlign: {
		textAlign: "right"
	},
	leftAlign: {
		textAlign: "left"
	},
	buttonsContainer: {
		marginBottom : theme.spacing.unit
	},
	removeButton : {
		marginLeft : "auto"
	}
});

const Expense_Group = ( props, { store } ) => {
	const {
		expense_group_children,
		expense_group_child_by_id,
		expense_group_options
	} = store.getState();

	const updateExpenseGroupEdit = ( event ) => {
		store.dispatch(updateEntity({
			id : props.id,
			[event.target.name] : event.target.value
		}));
	};

	const updateExpenseGroupOptions = ( event ) => {
		// console.log( event );
		store.dispatch(editEntityOption({
			id : props.id,
			[event.target.name] : event.target.value
		}));
	};

	const { classes, ...editEntityFieldProps } = props;

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

				{ typeof expense_group_options_object !== "undefined" ?
					<Grid item>
						<Entity_Manipulation_Button
							dispatchAction={ openExpenseGroupOptionsDialog({ id : props.id })}
							icon={<MoreHoriz />}
							variant="outlined"
						/>
						<Options_Dialog
							open={dialog_open}
							onChange={updateExpenseGroupOptions}
							onClose={() => store.dispatch(closeExpenseGroupOptionsDialog({ id : props.id })) }
							title={props.title}
							labelType="expense_group"
							options_values={optionsValues}
							options_values_list={readOnlyGroupData["expense_group_options"]}
							options_values_labels={readOnlyGroupData["expense_group_options_labels"]}
						/>
					</Grid> : ""
				}
				<Grid item className={classes.removeButton}>
					<Entity_Manipulation_Button
						dispatchAction={ removeExpenseGroup({
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
					childrenTotalCost={associatedChildrenCost}
					parentGroupCostUOM={optionsValues.costUOM}
				/>
				:
				<Typography align="left" component="p" variant="subtitle1">There are currently no expenses</Typography>
			}
			{/** Add an expense to the expense group **/}
			<Entity_Manipulation_Button
				dispatchAction={ addExpenseGroupChild({
					parentID : props.id
				})}
				text="Add Expense"
			/>
			{/** Bring up the editing window on the expense group **/}
			<Entity_Manipulation_Button
				dispatchAction={ editEntity({
					id : props.id,
					title : props.title,
					description : props.description
				})}
				text="Edit Group"
				classes={{
					root : classes.editButton
				}}
			/>
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