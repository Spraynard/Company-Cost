import { store } from "../../src/store";

// Redux Actions Import
import {
	addExpenseGroup,
	openExpenseGroupOptionsDialog,
	closeExpenseGroupOptionsDialog,
} from "../../src/actions/expense_group_actions";

import defaultState from "../../data/default_state.json";

let test_store;
let id;
let action;

let title = "A Test Expense Group";

beforeAll(() => {
	test_store = store(defaultState);
	action = addExpenseGroup({ title });
	id = action.id;
	test_store.dispatch(action);
});

describe("Expense Group Options Dialog Operations", () => {
	test("Opens", () => {
		let test_action = openExpenseGroupOptionsDialog({ id });
		test_store.dispatch(test_action);

		let expense_group_options = test_store.getState()["expense_group_options"];
		let expense_group_option = expense_group_options[id];

		expect(expense_group_option).toEqual({
			costUOM : "day",
			// size : "default",
			dialog_open : true
		});
	});

	test("Closes", () => {
		let test_action = closeExpenseGroupOptionsDialog({ id });
		test_store.dispatch(test_action);

		let expense_group_options = test_store.getState()["expense_group_options"];
		let expense_group_option = expense_group_options[id];

		expect(expense_group_option).toEqual({
			costUOM : "day",
			// size : "default",
			dialog_open : false
		});
	});
});