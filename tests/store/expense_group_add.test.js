import store from "../../src/store";
import {
	addExpenseGroup,
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
	test_store.dispatch(action);
});

describe("Expense Group By ID", () => {
	var expenseGroupByID;
	beforeEach(() => {
		expenseGroupByID = test_store.getState()["expense_group_by_id"];
	});

	test("Adds a UUID as the key", () => {
		expect(Object.keys(expenseGroupByID)[0].length).toBe(36);
	});

	test("Adds a title value", () => {
		expect(expenseGroupByID[id].title).toBe("A Test Expense Group");
	});

	test("Adds a timestamp value", () => {
		expect(expenseGroupByID[id].timestamp).toBeDefined();
	});
});

describe("Expense Groups", () => {
	var expenseGroups;

	beforeEach(() => {
		expenseGroups = test_store.getState()["expense_groups"];
	});

	test("Adds an expense groups to the state", () => {
		expect(expenseGroups[0]).toEqual(id);
	});
});