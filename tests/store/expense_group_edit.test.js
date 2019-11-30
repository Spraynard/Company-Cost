import { store } from "../../src/store";

// Redux Actions Import
import { addExpenseGroup } from "../../src/actions/expense_group_actions";

import {
	saveEntity,
	editEntity,
	updateEntity
} from "../../src/actions/entity_actions";

import defaultState from "../../data/default_state.json";

var group_title = "A Test Expense Group";
var group_title_edited = "A Test Expense Group - Edited";

let action_1, // Add expense group
	action_2, // Start editing expense group
	action_3,  // Update the expense group edit state with an edit
	action_4, // Save the edits over to the actual expense group state
	test_store, // Store we will be using to execute all of these actions
	expense_group_id;

beforeAll(() => {
	// Create a new expense group
	action_1 = addExpenseGroup({ title: group_title });

	// Signal that we are editing our expense group
	action_2 = editEntity({ id: action_1.id });

	// Update the expense group's information
	action_3 = updateEntity({
		id: action_1.id,
		title: group_title_edited
	});

	// Save the updates expense group information
	action_4 = saveEntity({ id: action_1.id });

	// Perform all of our actions
	test_store = store(defaultState);
	test_store.dispatch(action_1);
	test_store.dispatch(action_2);
	test_store.dispatch(action_3);
	test_store.dispatch(action_4);

	expense_group_id = action_1.id;
});

describe("Expense Group By ID", () => {
	test("Saves edits to expense group", () => {
		const { expense_group_by_id } = test_store.getState();
		expect( expense_group_by_id[expense_group_id].title ).toEqual( group_title_edited );
	});

	test("Marks expense group as edited, by turning edit mode off on it", () => {
		const { expense_group_by_id } = test_store.getState();

		expect( expense_group_by_id[expense_group_id].edit ).toBeFalsy();
	});

	/**
	 * There has to be a better way for this test to exist. This test ensures that whenever
	 * we add some sort of new state to expense group through expense_group_by_id that
	 * we will have to add it to this array.
	 */
	test("Ensure we're not adding any extra data to our expense group when we save", () => {
		const { expense_group_by_id } = test_store.getState();

		// eslint-disable-next-line no-unused-vars
		const { description, edit, timestamp, title, ...other } = expense_group_by_id[expense_group_id];

		expect(other).toEqual({});
	});
});

