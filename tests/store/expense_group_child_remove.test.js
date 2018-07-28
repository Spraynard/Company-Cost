import store from "../../src/store";
import {
	addExpenseGroup,
	addExpenseGroupChild,
	removeExpenseGroupChild
} from "../../src/actions";

import defaultState from "../../data/default_state.json";

let action_1, // Adding expense group
	action_2, // Adding expense group child
	action_3, // Removing expense group child
	action_1_params,
	action_2_params,
	action_3_params,
	expense_group_id,
	expense_group_child_id,
	group_title,
	group_child_title,
	group_child_desc,
	cost,
	costUOM;

group_title = "A Test Expense Group";
group_child_title = "A Test Expense Group Child";
group_child_desc = "A Test Expense Group Child Description";
cost = 29.35;
costUOM = "hour";

beforeAll(() => {
	action_1_params = { title : group_title };

	action_1 = addExpenseGroup(action_1_params);
	// Obtain the ID of the expense group
	expense_group_id = action_1.id;

	// Feed the expense group ID into this parameter here.
	action_2_params = {
		title : group_child_title,
		description: group_child_desc,
		cost : cost,
		costUOM : costUOM,
		parentID : expense_group_id
	};

	action_2 = addExpenseGroupChild(action_2_params);
	expense_group_child_id = action_2.id;

	test_store = store(defaultState);
	// Adding the expense group
	test_store.dispatch(action_1);
	// Adding the expense group child
	test_store.dispatch(action_2);
});

