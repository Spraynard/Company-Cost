import { store } from "../../src/store";

// Redux Actions Import
import {
	addExpenseGroup,
	addExpenseGroupChild,
} from "../../src/actions/expense_group_actions"

import {
	saveEntity,
	editEntity,
	updateEntity,
} from "../../src/actions/entity_actions";

import defaultState from "../../data/default_state.json";

var group_title = "A Test Expense Group";
var group_child_title = "A Test Expense Group Child";
var group_child_desc = "A Test Expense Group Child Description";
var cost = 29.35;
var costUOM = "hour";

var group_child_title_edited = "A Test Expense Group Child - Edited";

let test_store ,
	action_1, // expense group add
	action_1_params,
	action_2, // expense group child add
	action_2_params,
	action_3, // edit entity
	action_3_params,
	action_4, // update entity
	action_4_params,
	action_5, // save entity
	action_5_params,
	expense_group_id,
	expense_group_child_id;

beforeAll(() => {
	// action_1 - Add an expense group to store state
	action_1_params = { title : group_title };

	action_1 = addExpenseGroup( action_1_params );
	expense_group_id = action_1.id;

	// action_2 - Add an expense group child to store state
	action_2_params = {
		title : group_child_title,
		description: group_child_desc,
		cost : cost,
		costUOM : costUOM,
		parentID : expense_group_id
	};

	action_2 = addExpenseGroupChild( action_2_params );
	expense_group_child_id = action_2.id;

	// action_3 - Specify start to editing
	action_3_params = { id : expense_group_child_id };

	action_3 = editEntity( action_3_params );

	// action_4 - Update the item's edit container
	action_4_params = {
		id : expense_group_child_id,
		title : group_child_title_edited
	};

	action_4 = updateEntity( action_4_params );

	// action_5 - Save Edits
	action_5_params = { id : expense_group_child_id };

	action_5 = saveEntity( action_5_params );

	// Initialize our store
	test_store = store(defaultState);

	// Dispatch all of our actions
	test_store.dispatch(action_1);
	test_store.dispatch(action_2);
	test_store.dispatch(action_3);
	test_store.dispatch(action_4);
	test_store.dispatch(action_5);
});

describe("Expense Group Child By ID", () => {
	var expense_group_child_by_id;

	beforeEach(() => {
		expense_group_child_by_id = test_store.getState()["expense_group_child_by_id"];
	});

	test("Saves edits to expense group child", () => {
		expect( expense_group_child_by_id[expense_group_child_id].title ).toEqual( group_child_title_edited );
	});

	test("Marks expense group child as edited, by turning edit mode off on it", () => {
		expect( expense_group_child_by_id[expense_group_child_id].edit ).toBeFalsy();
	});
});

