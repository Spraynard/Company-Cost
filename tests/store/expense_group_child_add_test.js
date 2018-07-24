import C from "../../src/constants";
import { store } from "../../src/store";
import {
	addExpenseGroupChild
} from "../../src/actions";

import defaultState from "../../data/default_state.json";

var test_store;

let action_1,
	action_2,
	expense_group_id,
	expense_group_child_id;

var group_title = "A Test Expense Group";
var group_child_title = "A Test Expense Group Child";

beforeAll(() => {

	expense_group_id = action_1.id;
	expense_group_child_id = action_2.id;
	action_1 = addExpenseGroup(group_title);
	action_2 = addExpenseGroupChild(expense_group_id)
	test_store = store(defaultState);
	test_store.dispatch(action);
});

describe("Expense Group By ID", () => {

});