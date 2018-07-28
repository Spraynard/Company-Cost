import store from "../../src/store";
import {
	addExpenseGroup,
	addExpenseGroupChild
} from "../../src/actions";

import defaultState from "../../data/default_state.json";

var test_store;

let action_1,
	action_2,
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

	test_store = store(defaultState);
	// Adding the expense group
	test_store.dispatch(action_1);
	// Adding the expense group child
	test_store.dispatch(action_2);
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
		expect(Object.keys(expense_group_child_by_id)[0].length).toBe(36);
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
describe("Expense Group Children XREF", () => {});
describe("Expense Groups Expense Group CHildren", () => {});
