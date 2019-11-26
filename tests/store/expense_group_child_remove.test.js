import { store } from "../../src/store";

// Redux Actions Import
import {
	addExpenseGroup,
	addExpenseGroupChild,
	removeExpenseGroupChild
} from "../../src/actions/expense_group_actions";

import defaultState from "../../data/default_state.json";

let action_1, // Adding expense group
	action_2, // Adding expense group child
	action_3, // Removing expense group child
	action_1_params,
	action_2_params,
	expense_group_id,
	expense_group_child_id,
	group_title,
	group_child_title,
	group_child_desc,
	cost,
	costUOM,
	test_store;

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
	action_2 = addExpenseGroupChild({
		title: group_child_title,
		description: group_child_desc,
		cost: cost,
		costUOM: costUOM,
		parentID: expense_group_id
	});

	expense_group_child_id = action_2.id;

	action_3 = removeExpenseGroupChild({ id : expense_group_child_id });

	test_store = store(defaultState);
	// Adding the expense group
	test_store.dispatch(action_1);
	// Adding the expense group child
	test_store.dispatch(action_2);
	// Removing the expense group child
	test_store.dispatch(action_3);
});

describe("Expense Group Children", () => {
	test("Items in array have been removed", () => {
		let expense_group_children = test_store.getState()["expense_group_children"];
		expect(expense_group_children).toEqual([]);
	});
});

describe("Expense Group Child By ID", () => {
	test("Previous expense groups that have been added are now taken out of the object", () => {
		let expense_group_child_by_id = test_store.getState()["expense_group_child_by_id"];

		expect(expense_group_child_by_id).toEqual({});
	});
});

describe("Expense Group Children XREF", () => {
	test("On child removal, takes out the whole parent expense group", () => {
		let expense_group_children_xref = test_store.getState()["expense_group_children_xref"];
		expect(expense_group_children_xref).toEqual({
			[ action_1.id ] : []
		});
	});
});
