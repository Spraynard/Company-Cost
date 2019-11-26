import { store } from "../../src/store";

// Redux Actions Import
import { addExpenseGroup } from "../../src/actions/expense_group_actions";

import defaultState from "../../data/default_state.json";

let test_store;
let id;
let action;
let title = "A Test Expense Group";
let expense_group;

beforeAll(() => {
	test_store = store(defaultState);
	action = addExpenseGroup({ title });
	id = action.id;
	test_store.dispatch(action);
	expense_group = test_store.getState()["expense_group_by_id"][id];
});

describe("Expense Group By ID", () => {
	let expenseGroupByID;
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

	test("Expense Group Initial Structure", () => {
		const { description, edit, title, timestamp } = expense_group;
		expect(expense_group).toEqual({
			"timestamp": timestamp,
			"edit": edit,
			"title": title,
			"description": description
		});
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