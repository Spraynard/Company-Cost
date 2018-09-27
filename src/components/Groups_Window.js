import { PropTypes } from "prop-types";
import Expense_Group from "./Expense_Group";

const Groups_Window = (props, { store }) => {

	const {
		expense_group_by_id,
		expense_group_child_by_id
	} = store.getState();

	return (
		<section className="groups-window">
			This is where all of the expense groups and everything else will be
			{
				Object.keys(expense_group_by_id).map( expense_group_id => {
					const expense_group_data = expense_group_by_id[expense_group_id];
					return <Expense_Group key={expense_group_id} id={expense_group_id} { ...expense_group_data } />;
				})
			}
		</section>
	);
};

Groups_Window.contextTypes = {
	store : PropTypes.object.isRequired
};

export default Groups_Window;