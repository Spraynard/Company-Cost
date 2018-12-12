import store from "../../src/store";
import {
	addExpenseGroup,
	removeExpenseGroup,
	addExpenseGroupChild
} from "../../src/actions";

import defaultState from "../../data/default_state.json";

var test_store;
var id;
var action;

var title = "A Test Expense Group";

beforeAll(() => {
	test_store = store(defaultState);
	action = addExpenseGroup({ title });
	id = action.id;
	test_store.dispatch(action);// Adding an expense group
	test_store.dispatch(removeExpenseGroup({ id })); // Removing an expense group
});

describe("Expense Groups", () => {
	var expenseGroups;

	beforeEach(() => {
		expenseGroups = test_store.getState()["expense_groups"];
	});

	test("Removes an expense group from the expense_groups state", () => {
		expect(expenseGroups.length).toBe(0);
	});
});

describe("Expense Group By ID", () => {
	var expenseGroupByID;
	beforeEach(() => {
		expenseGroupByID = test_store.getState()["expense_group_by_id"];
	});

	test("Removes an expense group from the expense_group_by_id state", () => {
		expect(Object.keys(expenseGroupByID).length).toBe(0);
	});
});

describe("Expense Group Children", () => {
	let expense_group_children,
		expense_group_child_by_id;

	beforeEach(() => {
		let action_2 = addExpenseGroup({ title : "A Test Expense Group" });
		let action_2_id = action_2.id;

		let action_3 = addExpenseGroupChild({ parentID : action_2_id, title : "A Test Expense Group Child #1" });
		let action_4 = addExpenseGroupChild({ parentID : action_2_id, title : "A Test Expense Group Child #2" });

		let action_5 = removeExpenseGroup({ id : action_2_id });
		test_store.dispatch(action_2);
		test_store.dispatch(action_3);
		test_store.dispatch(action_4);
		test_store.dispatch(action_5);

		expense_group_children = test_store.getState()["expense_group_children"];
		expense_group_child_by_id = test_store.getState()["expense_group_child_by_id"];
	});

	test("Removes children in expense_group_children linked to expense group on expense group removal", () => {
		expect(expense_group_children.length).toBe(0);
	});

	test("Remove children in expense_group_child_by_id linked to expense group on expense group removal", () => {
		expect(Object.keys(expense_group_child_by_id).length).toBe(0);
	})
});