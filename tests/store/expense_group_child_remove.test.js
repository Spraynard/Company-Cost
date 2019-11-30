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

	// Add an expense group to the state
	action_1 = addExpenseGroup({ title: group_title });

	// Add an expense group child to our eexpense group made.
	action_2 = addExpenseGroupChild({
		title: group_child_title,
		description: group_child_desc,
		cost: cost,
		costUOM: costUOM,
		parentID: action_1.id
	});

	// Remove the expense group child that was made.
	action_3 = removeExpenseGroupChild({ id : action_2.id });

	// Perform all of our actions.
	test_store = store(defaultState);
	test_store.dispatch(action_1);
	test_store.dispatch(action_2);
	test_store.dispatch(action_3);
});

describe("Expense Group Children State", () => {
	test("Items in array have been removed", () => {
		const { expense_group_children } = test_store.getState();

		expect(expense_group_children).toEqual([]);
	});
});

describe("Expense Group Child By ID State", () => {
	test("Previous expense groups that have been added are now taken out of the object", () => {
		const { expense_group_child_by_id } = test_store.getState();

		expect(expense_group_child_by_id).toEqual({});
	});
});

describe("Expense Group Children XREF State", () => {
	test("Should reflect the state of children assigned to this expense group. Even when empty.", () => {
		const { expense_group_children_xref } = test_store.getState();

		expect(expense_group_children_xref).toEqual({
			[ action_1.id ] : []
		});
	});
});
