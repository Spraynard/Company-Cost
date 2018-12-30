import { store } from "../../src/store";

import {
	addExpenseGroup,
	removeExpenseGroup,
} from "../../src/actions";

import defaultState from "../../data/default_state.json";

let test_store;
let id;
let action;
let action_2;

let title = "A Test Expense Group";

beforeAll(() => {
	test_store = store(defaultState);
	action = addExpenseGroup({ title });
	id = action.id;
	action_2 = removeExpenseGroup({ id });
	test_store.dispatch(action);
	test_store.dispatch(action_2);
});

describe("Expense Group Options Remove Handling", () => {
	test("State should no contain anything after remove", () => {
		let expense_group_options = test_store.getState()["expense_group_options"];
		expect( expense_group_options ).toEqual({});
		expect( expense_group_options[id]).toBeUndefined();
	});
});