import { store } from "../../src/store";

// Redux Actions Import
import { addExpenseGroup } from "../../src/actions/expense_group_actions";
import { editEntityOption } from "../../src/actions/entity_actions";

import defaultState from "../../data/default_state.json";

let test_store;
let id;
let action;
let action_2;
let default_costUOM;
let default_size;
let default_expense_group_options_obj;

let title = "A Test Expense Group";

let edited_option_costUOM = "week";
let edited_option_size = "large";

beforeAll(() => {
	test_store = store(defaultState);
	action = addExpenseGroup({ title });
	id = action.id;
	action_2 = editEntityOption({ id, costUOM : edited_option_costUOM, size : edited_option_size });
	test_store.dispatch(action);
	default_expense_group_options_obj = test_store.getState()["expense_group_options"];
	default_costUOM = default_expense_group_options_obj[id].costUOM;
	default_size = default_expense_group_options_obj[id].size;
	test_store.dispatch(action_2);
});

describe("Expense Group Options", () => {
	let expense_group_options,
		expense_group_option;

	beforeEach(() => {
		expense_group_options = test_store.getState()["expense_group_options"];
		expense_group_option = expense_group_options[id];
	});

	test("Current CostUOM Value is not default costUOM value", () => {
		expect( expense_group_option.costUOM ).not.toEqual( default_costUOM );
	});

	test("Current costUOM value equals the input costUOM value", () => {
		expect( expense_group_option.costUOM ).toEqual( edited_option_costUOM );
	});

	test("Current Size Value is not default size value", () => {
		expect( expense_group_option.size ).not.toEqual( default_size );
	});

	test("Current size value equals the input size value", () => {
		expect( expense_group_option.size ).toEqual( edited_option_size );
	});
});