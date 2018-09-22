import store from "../../src/store";

import {
	addExpenseGroup,
	saveEntity,
	editEntity,
	updateEntity
} from "../../src/actions";

import defaultState from "../../data/default_state.json";

var group_title = "A Test Expense Group";
var group_title_edited = "A Test Expense Group - Edited";

let action_1, // Add expense group
	action_1_params,
	action_2, // Start editing expense group
	action_2_params,
	action_3,  // Update the expense group edit state with an edit
	action_3_params,
	action_4, // Save the edits over to the actual expense group state
	action_4_params,
	test_store, // Store we will be using to execute all of these actions
	expense_group_id;

beforeAll(() => {
	// action_1 - Add an expense group to store state
	action_1_params = { title : group_title };

	action_1 = addExpenseGroup( action_1_params );
	expense_group_id = action_1.id;

	// action_2 - Specify start to editing
	action_2_params = { id : expense_group_id };

	action_2 = editEntity( action_2_params );

	// action_3 - Update the item's edit container
	action_3_params = {
		id : expense_group_id,
		title : group_title_edited
	};

	action_3 = updateEntity( action_3_params );

	// action_4
	action_4_params = { id : expense_group_id };

	action_4 = saveEntity( action_4_params );

	// Initialize our store
	test_store = store(defaultState);

	// Dispatch all of our actions
	test_store.dispatch(action_1);
	test_store.dispatch(action_2);
	test_store.dispatch(action_3);
	test_store.dispatch(action_4);
});

describe("Expense Group By ID", () => {
	var expense_group_by_id;

	beforeEach(() => {
		expense_group_by_id = test_store.getState()["expense_group_by_id"];
	});

	test("Saves edits to expense group", () => {
		expect( expense_group_by_id[expense_group_id].title ).toEqual( group_title_edited );
	});

	test("Marks expense group as edited, by turning edit mode off on it", () => {
		expect( expense_group_by_id[expense_group_id].edit ).toBeFalsy();
	});
});

