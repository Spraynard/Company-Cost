import PropTypes from "prop-types";
import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import Entity_Edit_Field from "./Entity_Edit_Field";
import Expense_Group_Child from "./Expense_Group_Child";
import {
	Group_Information
} from './Group_Information';

import {
	removeExpenseGroup,
	addExpenseGroupChild,
	editEntity,
	updateEntity
} from "../actions";

import { convertNumericalValue } from '../helpers/helpers';
import readOnlyGroupData from '../../data/read_only_group_data.json';

// MaterialUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import DeleteForever from '@material-ui/icons/DeleteForever';

const styles = theme => ({
	root : {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	rightAlign: {
		textAlign: 'right'
	},
	leftAlign: {
		textAlign: 'left'
	}
})

const Expense_Group = ( props, { store } ) => {
	const {
		expense_group_children,
		expense_group_child_by_id
	} = store.getState();

	const updateExpenseGroupEdit = ( event ) => {
		store.dispatch(updateEntity({
			id : props.id,
			[event.target.name] : event.target.value
		}));
	};

	const { classes } = props;

	const children_of_expense_group = expense_group_children.filter( expense_group_child_id => {
		return expense_group_child_by_id[expense_group_child_id].parentID === props.id;
	});

	let cost_of_associated_children = children_of_expense_group.reduce(
		( accumulator, currentValue ) => {
			let expense_data = expense_group_child_by_id[currentValue];
			let expense_cost = expense_data.cost;
			let expense_cost_uom = expense_data.costUOM;
			// Convert the value of the current expenses' costUOM to "day"
			// and add it to the pile.

			if ( expense_cost_uom !== 'day' )
			{
				expense_cost = convertNumericalValue( expense_cost, expense_cost_uom, 'day' );
			}

			return accumulator + expense_cost;
		},
		0
	);

	return (
		<div className="expense-group">
			{ ( props.edit ) ?
				<Paper className={`expense-group-content ${classes.root}`}>
					<Entity_Edit_Field { ...props } updateListener={updateExpenseGroupEdit}/>
				</Paper> :
				<Paper className={`expense-group-content ${classes.root} ${classes.rightAlign}`}>
					<Entity_Manipulation_Button
						dispatchAction={ removeExpenseGroup({
							"id" : props.id
						})}
						icon={<DeleteForever />}
						variant="outlined"
						extraClasses={["expense-group-remove-button"]}
					/>
					<Typography align="left" component="h2" variant="h5" className="expense-group-name">{props.title}</Typography>
					<Typography align="left" component="p" variant="subtitle2" className="expense-group-description">{props.description}</Typography>
					<hr />
					{
						children_of_expense_group.length ?
						<Grid container spacing={8} className={`expense-group-information-wrapper ${classes.leftAlign}`}>
							<Group_Information
								header={children_of_expense_group.length}
								text={ (children_of_expense_group.length === 1 ) ? "Expense" : "Expenses" }
							/>
							<Group_Information
								header="Cost:"
								text={`${cost_of_associated_children} per ${props.costUOM}`}
							/>
						</Grid>
						:
						""
					}
					<Grid container justify="flex-start" className="expense-group-child-list">
						{ children_of_expense_group.map( ( filtered_group_child_id, index ) =>
							<Expense_Group_Child
								key={index}
								{
								...expense_group_child_by_id[filtered_group_child_id]
								}

								id={filtered_group_child_id}
							/>
						)}
					</Grid>
					<Entity_Manipulation_Button
						dispatchAction={ addExpenseGroupChild({
							parentID : props.id
						})}
						text="Add Child"
						extraClasses={["expense-group-child-add-button"]}
					/>
					<Entity_Manipulation_Button
						dispatchAction={ editEntity({
							id : props.id,
							title : props.title,
							description : props.description
						})}
						text="Edit"
						extraClasses={["expense-group-edit-button"]}
					/>
				</Paper>
			}
		</div>
	);
};

Expense_Group.defaultProps = {
	title : "Expense Group",
	id : "NO ID"
};

Expense_Group.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Expense_Group);