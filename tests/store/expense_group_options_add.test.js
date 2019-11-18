import { store } from "../../src/store";

// Redux Actions Import
import { addExpenseGroup } from "../../src/actions/expense_group_actions";
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

describe("Expense Group Options", () => {
	let expense_group_options,
		expense_group_option;

	beforeEach(() => {
		expense_group_options = test_store.getState()["expense_group_options"];
		expense_group_option = expense_group_options[id];
	});

	test("Adds a UUID as the key", () => {
		expect(Object.keys(expense_group_options)[0].length).toBe(36);
	});

	test("Adds Default costUOM Value", () => {
		expect(expense_group_option.costUOM).toBe("day");
	});

	test("Adds Default Size Value", () => {
		expect(expense_group_option.size).toBe("default");
	});
});