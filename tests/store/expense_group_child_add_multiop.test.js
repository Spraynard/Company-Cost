/**
 * Title: Expense Group Child Add Multi-op test
 * Description: Used to test reducers when faced with multiple operations.
 * Deals with making a group, adding a child, removing the child, and then adding another child
 */
import store from "../../src/store";

import {
	addExpenseGroup,
	addExpenseGroupChild,
	removeExpenseGroupChild,
} from "../../src/actions";

import defaultState from "../../data/default_state.json";

var test_store;

let action_1,
	action_2,
	action_3,
	action_4,
	expense_group_id,
	action_1_params,
	action_2_params,
	expense_group_child_id;

var group_title = "A Test Expense Group";
var group_child_title = "A Test Expense Group Child";
var group_child_desc = "A Test Expense Group Child Description";
var cost = 29.35;
var costUOM = "hour";

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

	// Removing the child we just made
	action_3 = removeExpenseGroupChild({ id : expense_group_child_id, parentID : expense_group_id });

	// Adding another child with the same input
	action_4 = addExpenseGroupChild(action_2_params);
	expense_group_child_id = action_4.id;

	test_store = store(defaultState);
	// Adding the expense group
	test_store.dispatch(action_1);
	// Adding the expense group child
	test_store.dispatch(action_2);
	// Removing the child
	test_store.dispatch(action_3);
	// Adding a child back in
	test_store.dispatch(action_4);
});

describe("Expense Group Children", () => {
	var expense_group_children;

	beforeEach(() => {
		expense_group_children = test_store.getState()["expense_group_children"];
	});

	test("Adds a UUID in the array", () => {
		expect(expense_group_children[0].length).toBe(36);
	});
});

describe("Expense Group Child By ID", () => {
	var expense_group_child_by_id;

	beforeEach(() => {
		expense_group_child_by_id = test_store.getState()["expense_group_child_by_id"];
	});

	test("Adds an object with a UUID key", () => {
		let id_key = Object.keys(expense_group_child_by_id)[0];
		expect(id_key.length).toBe(36);
		expect(id_key).toBe(expense_group_child_id);
	});

	test("Adds a title", () => {
		expect(expense_group_child_by_id[expense_group_child_id].title).toBe(group_child_title);
	});

	test("Adds a description", () => {
		expect(expense_group_child_by_id[expense_group_child_id].description).toBe(group_child_desc);
	});

	test("Adds a cost", () => {
		expect(expense_group_child_by_id[expense_group_child_id].cost).toBe(cost);
	});

	test("Adds a costUOM", () => {
		expect(expense_group_child_by_id[expense_group_child_id].costUOM).toBe(costUOM);
	});

	test("Adds a parentID", () => {
		expect(expense_group_child_by_id[expense_group_child_id].parentID).toBe(expense_group_id);
	});
});

describe("Expense Group Children XREF", () => {
	var expense_group_children_xref;

	beforeEach(() => {
		expense_group_children_xref = test_store.getState()["expense_group_children_xref"];
	});

	test("Adds Parent UUID as a key", () => {
		let id_key = Object.keys(expense_group_children_xref)[0];
		expect(id_key.length).toBe(36);
		expect(id_key).toBe(expense_group_id);
	});

	test("Adds childID into parentID keyed array", () => {
		let expense_group_children_xref_child_array = expense_group_children_xref[expense_group_id];
		expect(expense_group_children_xref_child_array[0].length).toBe(36);
		expect(expense_group_children_xref_child_array[0]).toBe(expense_group_child_id);
	});
});

// describe("Expense Groups Expense Group Children", () => {});
