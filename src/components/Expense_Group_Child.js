import { PropTypes } from "prop-types";

const Expense_Group_Child = (props, { store }) => {
	return (
		<li className="expense-group-child">
			Child here!!!
		</li>
	);
};

Expense_Group_Child.contextTypes = {
	store : PropTypes.object.isRequired
};

export default Expense_Group_Child;