import { PropTypes } from "prop-types";
import {
	editEntity,
	removeExpenseGroupChild,
	updateEntity,
} from "../actions";

import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import Entity_Edit_Field from "./Entity_Edit_Field";

const Expense_Group_Child = (props, { store }) => {
	let { timestamp, parentID, edit, ...editValues } = props;

	const updateExpenseGroupChildEdit = ( event ) => {
		console.log("Our Event", event);
		if ( event.target.type === "number" )
		{
			if ( Number(event.target.value) !== event.target.value )
			{
				return;
			}
		}

		console.log( event.target.type );
		store.dispatch(updateEntity({
			id : props.id,
			[event.target.name] : event.target.value
		}));
	};

	return (
		<li className="expense-group-child">
			{ props.edit ?
				<Entity_Edit_Field {...props} updateListener={updateExpenseGroupChildEdit} />
				:
				<div className="expense-group-child-content">
					<h4>{props.title}</h4>
					<p><i>{props.description}</i></p>
					<span>{ props.cost ? props.cost + ' ' : '' }{ props.costUOM ? 'per ' + props.costUOM : ''}</span>
					<Entity_Manipulation_Button
						dispatchAction={ editEntity({...editValues})}
						text="Edit"
						extraClasses={["expense-group-child-edit-button"]}
					/>
					<Entity_Manipulation_Button
						dispatchAction={removeExpenseGroupChild({
							id : props.id,
							parentID : props.parentID
						})}
						text="X"
						extraClasses={["expense-group-child-remove-button"]}
					/>
				</div>
			}
		</li>
	);
};

Expense_Group_Child.defaultProps = {
	title : "Expense Group Child"
};

Expense_Group_Child.contextTypes = {
	store : PropTypes.object.isRequired
};

export default Expense_Group_Child;