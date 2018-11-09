import C from "../../src/constants";

/**
 * Expense_Group specific reducers
 */
import {
	expense_groups,
	expense_group_by_id,
	expense_group_options
} from "../../src/reducers/expense_group_reducers";


// Importing actions to use. These should work and be tested out correctly.
import {
	addExpenseGroup,
	removeExpenseGroup,
	editEntity,
	saveEntity,
	cancelEditEntity,
	editEntityOption,
	openExpenseGroupOptionsDialog,
	closeExpenseGroupOptionsDialog
} from "../../src/actions";

var expense_group_child_action_helper = {};

beforeAll(() => {
	expense_group_child_action_helper.title = "Test";
	expense_group_child_action_helper.description = "A Test Expense Group Child";
	expense_group_child_action_helper.cost = 1.00;
	expense_group_child_action_helper.costUOM = "hour";
	expense_group_child_action_helper.parentID = 1;
});

describe("Expense Groups", () => {
	var state;

	beforeEach(() => {
		state = [];
	});

	// Not using an action generator with this test
	test("Will return initial state if there is no type given.", () => {
		var action = addExpenseGroup({ title : "Test Title" });
		// Casting the type as undefined in order to test the behavior of this test.
		action.type = undefined;

		var results = expense_groups( state, action );

		expect( results ).toEqual([]);
	});

	test("Will add an expense group ID to the state array", () => {

		var title = "Expense Group Test #1";
		var action = addExpenseGroup({ title });
		var results = expense_groups( state, action );

		// expect( results ).toEqual([ 0 ]); // Expect results to output an array
		expect(results[0].length).toBe(36); // We're making sure the IDs are actually being made.
	});

	test("Will remove an expense group ID from the state array", () => {
		state = [ 1, 2, 3, 4 ];

		var id = 2;
		var action = removeExpenseGroup({ id });

		var results = expense_groups( state, action );
		expect( results ).toEqual([ 1, 3, 4 ]); // This should be good enough.
	});
});

describe("Expense Group By ID", () => {
	var state;

	beforeEach(() => {
		state = {};
	});

	test("Returns state on action not having a type", () => {
		var action = addExpenseGroup({ title : "A Test Expense Group" });
		action.type = undefined;

		var results = expense_group_by_id( state, action );
		expect( results ).toEqual({});
	});

	test("Will add an expense group, key => id, value => expense group data", () => {
		var action = {
			type : C.ADD_EXPENSE_GROUP,
			id : 0,
			title : "Expense Group 1",
			timestamp : new Date().toString(),
		};

		var results = expense_group_by_id( state, action );

		expect( results ).toEqual({
			0 : {
				title : "Expense Group 1",
				timestamp : action.timestamp
			}
		});
	});

	test("Will remove an expense group from the state", () => {
		state = {
			0 : {
				title : "Expense Group 1",
				timestamp : new Date().toString()
			}
		};

		var action = removeExpenseGroup({ id : 0 });

		var results = expense_group_by_id( state, action );
		expect( results ).toEqual({});
	});

	///////////////////////
	// Edit Mode Testing //
	///////////////////////

	test("Will initialize an expense group with a false edit", () => {
		var action = addExpenseGroup( expense_group_child_action_helper );
		var action_id = action.id;

		var results = expense_group_by_id( state, action );
		expect(results[action_id].edit).toBe(false);
	});

	/////////////////////////
	// EDIT ENTITY ACTIONS //
	/////////////////////////
	test("Will return initial state on editEntity action when we don't have specific entity", () => {
		var action_1 = addExpenseGroup( expense_group_child_action_helper );
		var action_2 = addExpenseGroup( expense_group_child_action_helper );

		var action_1_id = action_1.id;
		var action_2_id = action_2.id;

		// Insert the first actio into the state, but not the second.
		state = expense_group_by_id( state, action_1 );

		// Now we do an "editEntity" action with action_2's id, hopefully getting back the same state that we had before.
		var action_3 = editEntity({ id : action_2_id });
		var results = expense_group_by_id( state, action_3 );

		expect( typeof results[action_2_id] ).toBe("undefined");
		expect( results[action_1_id].edit ).toBe(false);
		expect( Object.keys(results).length ).toBe(1);
	});

	test("Will enable editing when there is a valid expense group object", () => {
		var action = addExpenseGroup( expense_group_child_action_helper );
		state = expense_group_by_id( state, action );
		var action_2 = editEntity( action );
		var results = expense_group_by_id( state, action_2 );

		expect( results[action.id].edit ).toBe(true);
	});

	////////////////////////
	// Save Edit Actions  //
	////////////////////////
	test("Will return initial state on cancelEditEntity action when we don't have specific entity", () => {
		var action_1 = addExpenseGroup( expense_group_child_action_helper );
		state = expense_group_by_id( state, action_1 );

		// Enable editing on expense group
		var action_2 = editEntity( action_1 );
		state = expense_group_by_id( state, action_2 );


		// Expect that we have an item in edit mode.
		expect( state[ action_1.id ].edit ).toBeTruthy();

		// Spawn a separate expense_group_child
		var action_3 = addExpenseGroup( expense_group_child_action_helper );

		// Spawn a save edit action on the separate expense_group_child
		var action_4 = saveEntity( action_3 );

		// Now apply the action to the current state
		var results = expense_group_by_id( state, action_4 );

		expect(Object.keys(results).length).toBe(1);

		expect( results[action_1.id].edit ).toBeTruthy();
	});

	test("Will successfully save an edit and revert to non-edit mode for that item", () => {
		// Feeding expense groups into state.
		var action_1 = addExpenseGroup( expense_group_child_action_helper );
		state = expense_group_by_id( state, action_1 );

		// Enable editing on expense group
		var action_2 = editEntity( action_1 );
		state = expense_group_by_id( state, action_2 );

		// Check and see that the editEntry action currently works
		expect(state[action_1.id].edit).toBeTruthy();

		// Cancel editing on expense group
		var action_3 = saveEntity( action_1 );

		// Now apply the cancel edit action to the state
		var results = expense_group_by_id( state, action_3 );

		// Check to see that we have successfully canceled an edit.
		expect(results[action_1.id].edit).toBeFalsy();
	});

	////////////////////////////////
	// CANCEL EDIT ENTITY ACTIONS //
	////////////////////////////////
	test("Will return initial state on cancelEditEntity action when we don't have specific entity", () => {
		// Feeding expense groups into state.
		var action_1 = addExpenseGroup( expense_group_child_action_helper );
		state = expense_group_by_id( state, action_1 );

		// Enable editing on expense group
		var action_2 = editEntity( action_1 );
		state = expense_group_by_id( state, action_2 );

		// Spawn a separate expense_group_child
		var action_3 = addExpenseGroup( expense_group_child_action_helper );

		// Spawn a cancel cancelEditEntity action on the separate expense_group_child
		var action_4 = cancelEditEntity( action_3 );

		// Now apply the action to the current state
		var results = expense_group_by_id( state, action_4 );

		// Should only have a length of one.
		expect(Object.keys(results).length).toBe(1);

		// Object in results should be currently editing
		expect(results[action_1.id].edit).toBeTruthy();
	});

	test("Will successfully cancel edit on a file currently set for edit", () => {
		// Feeding expense groups into state.
		var action_1 = addExpenseGroup( expense_group_child_action_helper );
		state = expense_group_by_id( state, action_1 );

		// Enable editing on expense group
		var action_2 = editEntity( action_1 );
		state = expense_group_by_id( state, action_2 );

		// Check and see that the editEntry action currently works
		expect(state[action_1.id].edit).toBeTruthy();

		// Cancel editing on expense group
		var action_3 = cancelEditEntity( action_1 );

		// Now apply the cancel edit action to the state
		var results = expense_group_by_id( state, action_3 );

		// Check to see that we have successfully canceled an edit.
		expect(results[action_1.id].edit).toBeFalsy();
	});
});


///////////////////////////
// Expense Group Options //
///////////////////////////
describe("Expense Group Options", () => {
	var state;

	beforeEach(() => {
		state = {};
	});

	test("Returns given state when updated without an action type", () => {
		let action = { costUOM : "week", size : "large" };

		state = expense_group_options( state, action );

		expect( state ).toEqual({});
	});

	test("Add into state on C.EXPENSE_GROUP_ADD with defaults", () => {
		let action = addExpenseGroup({ title : "Expense Group Options Test Title", description : "Expense Group Options Test Description"});

		state = expense_group_options( state, action );

		expect(state).toEqual({
			[ action.id ] : {
				costUOM : "day",
				size : "default",
				dialog_open : false
			}
		});
	});

	test("Remove from state on C.EXPENSE_GROUP_REMOVE", () => {
		let action_1 = addExpenseGroup({ title : "Expense Group Options Test Title", description : "Expense Group Options Test Description"});
		let action_2 = removeExpenseGroup({ id : action_1.id });

		state = expense_group_options( state, action_1 );
		state = expense_group_options( state, action_2 );

		expect(state).toEqual({});
	});

	test("Successfully edits items when updated with new values", () => {
		let action_1 = addExpenseGroup({ title : "Expense Group Options Test Title", description : "Expense Group Options Test Description"});
		let action_2 = editEntityOption({
			id : action_1.id,
			costUOM : "week",
			size : "large"
		});

		state = expense_group_options( state, action_1 );
		state = expense_group_options( state, action_2 );

		expect(state).toEqual({
			[ action_1.id ] : {
				costUOM : "week",
				size : "large",
				dialog_open : false
			}
		});
	});

	test("Successfully opens options dialog when given an options dialog open action", () => {
		let action_1 = addExpenseGroup({ title : "Expense Group Options Test Title", description : "Expense Group Options Test Description"});
		let action_2 = openExpenseGroupOptionsDialog({ id : action_1.id });

		state = expense_group_options( state, action_1 );
		state = expense_group_options( state, action_2 );

		expect(state).toEqual({
			[ action_1.id ] : {
				costUOM : "day",
				size : "default",
				dialog_open : true
			}
		});
	});

	test("Successfully closes options dialog when given an options dialog close action", () => {
		let action_1 = addExpenseGroup({ title : "Expense Group Options Test Title", description : "Expense Group Options Test Description"});
		let action_2 = openExpenseGroupOptionsDialog({ id : action_1.id });
		let action_3 = closeExpenseGroupOptionsDialog({ id : action_1.id });

		state = expense_group_options( state, action_1 );
		state = expense_group_options( state, action_2 );
		state = expense_group_options( state, action_3 );

		expect(state).toEqual({
			[ action_1.id ] : {
				costUOM : "day",
				size : "default",
				dialog_open : false
			}
		});
	});
})