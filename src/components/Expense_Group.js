import PropTypes from "prop-types";
import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import Entity_Edit_Field from "./Entity_Edit_Field";
import Expense_Group_Child from "./Expense_Group_Child";
import {
	removeExpenseGroup,
	addExpenseGroupChild,
	editEntity,
	updateEntity
} from "../actions";

// MaterialUI
import Paper from '@material-ui/core/Paper';

const Expense_Group = ( props, { store } ) => {
	const expense_group_children = store.getState().expense_group_children;
	const expense_group_child_by_id = store.getState().expense_group_child_by_id;
	const updateExpenseGroupEdit = ( event ) => {
		store.dispatch(updateEntity({
			id : props.id,
			[event.target.name] : event.target.value
		}));
	};

	const children_of_expense_group = expense_group_children.filter( expense_group_child_id => {
		return expense_group_child_by_id[expense_group_child_id].parentID === props.id;
	});

	let cost_of_associated_children = 0;

	if ( children_of_expense_group.length > 0 ) {
		cost_of_associated_children = children_of_expense_group.map( child =>
			expense_group_child_by_id[child].cost )
	}
	return (
		<div className="expense-group">
			{ ( props.edit ) ?
				<div className="expense-group-content">
					<Entity_Edit_Field { ...props } updateListener={updateExpenseGroupEdit}/>
				</div> :
				<Paper className="expense-group-content">
					<Entity_Manipulation_Button
						dispatchAction={ removeExpenseGroup({
							"id" : props.id
						})}
						text="X"
						extraClasses={["expense-group-remove-button"]}
					/>
					<h4 className="expense-group-name">{ props.title }</h4>
					<p className="expense-group-description">{ props.description }</p>
					<i>{ children_of_expense_group.length } Expenses Associated At A Cost Of { /* cost_of_associated_children */ }</i>
					<ul className="expense-group-child-list">
						{ children_of_expense_group.map( ( filtered_group_child_id, index ) =>
							<Expense_Group_Child
								key={index}
								{
								...expense_group_child_by_id[filtered_group_child_id]
								}

								id={filtered_group_child_id}
							/>
						)}
					</ul>
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

export default Expense_Group;