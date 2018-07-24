import store from "../../src/store";
import {
	addExpenseGroup,
	removeExpenseGroup,
} from "../../src/actions";

import defaultState from "../../data/default_state.json";

var test_store;
var id;
var action;

var title = "A Test Expense Group";

beforeAll(() => {
	test_store = store(defaultState);
	action = addExpenseGroup(title);
	id = action.id;
	test_store.dispatch(action);// Adding an expense group
	test_store.dispatch(removeExpenseGroup(id)) // Removing an expense group
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