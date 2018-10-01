import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import { removeExpenseGroup } from "../actions";

const Expense_Group = ({ id, title }) =>
	<div className="expense-group">
		<h3>Expense_Group ID: {id}</h3>
		<div className="expense-group-name">
			{title}
		</div>
		<Entity_Manipulation_Button
			dispatchAction={ removeExpenseGroup({
				"id" : id
			})}
			text="X"
			extraClasses={["expense-group-remove-button"]}
		/>
	</div>;

export default Expense_Group;