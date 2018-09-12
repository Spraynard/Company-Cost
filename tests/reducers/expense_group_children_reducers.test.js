import C from "../../src/constants";

/**
 * Expense Group Child specific reducers
 */
import {
	expense_group_children,
	expense_group_child_by_id,
	expense_group_children_xref,
} from "../../src/reducers/expense_group_children_reducers";

// Importing actions to use. These should work and be tested out correctly.
import {
	addExpenseGroupChild,
	removeExpenseGroupChild,
	removeExpenseGroup,
	addExpenseGroup,
	editEntity,
	saveEntity,
	cancelEditEntity
} from "../../src/actions";

var expense_group_child_action_helper = {};

beforeAll(() => {
	expense_group_child_action_helper.title = "Test";
	expense_group_child_action_helper.description = "A Test Expense Group Child";
	expense_group_child_action_helper.cost = 1.00;
	expense_group_child_action_helper.costUOM = "hour";
	expense_group_child_action_helper.parentID = 1;
});

////////////////////////////
// Expense Group Children //
////////////////////////////
describe("Expense Group Children", () => {
	var state;

	beforeEach(() => {
		state = [];
	});

	test("Will return initial state if there is no type given.", () => {
		var action = removeExpenseGroupChild({ id : 0 });
		action.type = undefined;

		var results = expense_group_children( state, action );
		expect( results ).toEqual([]);
	});

	test("Will add an expense group ID to the state array", () => {
		var action = addExpenseGroupChild( expense_group_child_action_helper );

		var results = expense_group_children( state, action );
		expect( results[0].length ).toBe(36);
	});

	test("Will remove an expense group ID from the state array", () => {
		state = [ 1, 2, 3, 4 ];

		var action = removeExpenseGroupChild({ id : 2 });

		var results = expense_group_children( state, action );
		expect( results ).toEqual([ 1, 3, 4 ]);
	});
});

///////////////////////////////
// Expense Group Child By ID //
///////////////////////////////
describe("Expense Group Child By ID", () => {
	var state;

	beforeEach(() => {
		state = {};
	});

	test("Returns state on action not having a type", () => {

		var action = addExpenseGroupChild( expense_group_child_action_helper );
		action.type = undefined;

		var results = expense_group_child_by_id( state, action );
		expect( results ).toEqual({});
	});

	test("Will add an expense group child to uninitialized state.", () => {
		var action = addExpenseGroupChild({
			title : "test",
			description : "this is a test",
			cost : 12.03,
			costUOM : "hour",
			parentID : 1,
		});

		var returnedID = action.id;

		var results = expense_group_child_by_id( state, action );
		expect( results ).toEqual({
			[ returnedID ] : {
				title : action.title,
				description : action.description,
				cost : action.cost,
				costUOM : action.costUOM,
				parentID : 1,
				timestamp : action.timestamp,
				edit : false
			}
		});
	});

	test("Will add an expense group child to initialized state.", () => {

		var action_1 = addExpenseGroupChild({
			title : "First Expense Group",
			description : "The first expense group in a test",
			cost : 10.00,
			costUOM : "hour",
			parentID : 0
		});

		var { action_1_id, ...rest_1 } = action_1;
		// Set up an initialized state;
		var expense_group_child_by_id_object = {
			[action_1_id] : {
				...rest_1
			}
		};

		state = expense_group_child_by_id(
			state,
			action_1
		);

		var state_step_1 = { ...state };

		var action_2 = addExpenseGroupChild({
			title : "another test",
			description : "this is a test",
			cost : 16.25,
			costUOM : "hour",
			parentID : 0
		});

		var returnedID = action_2.id;

		var results = expense_group_child_by_id( state, action_2 );
		expect( results ).toEqual({
			...state_step_1,
			[returnedID] : {
				title : action_2.title,
				description : action_2.description,
				cost : action_2.cost,
				costUOM : action_2.costUOM,
				parentID : 0,
				timestamp : action_2.timestamp,
				edit : false,
			}
		});
	});

	test("Will remove an expense group child from the state", () => {
		state = {
			0 : {
				title : "test",
				description : "this is a test",
				cost : 12.03,
				costUOM : "hour"
			}
		};

		var action = removeExpenseGroupChild({ id : 0 });

		var results = expense_group_child_by_id( state, action );
		expect( results ).toEqual({});
	});

	///////////////////////
	// Edit Mode Testing //
	///////////////////////

	test("Will initialize an expense group with a false edit", () => {
		var action = addExpenseGroupChild( expense_group_child_action_helper );
		var action_id = action.id;

		var results = expense_group_child_by_id( state, action );
		expect(results[action_id].edit).toBe(false);
	});

	/////////////////////////
	// EDIT ENTITY ACTIONS //
	/////////////////////////
	test("Will return initial state on editEntity action when we don't have specific entity", () => {
		var action_1 = addExpenseGroupChild( expense_group_child_action_helper );
		var action_2 = addExpenseGroupChild( expense_group_child_action_helper );

		var action_1_id = action_1.id;
		var action_2_id = action_2.id;

		// Insert the first actio into the state, but not the second.
		state = expense_group_child_by_id( state, action_1 );

		// Now we do an "editEntity" action with action_2's id, hopefully getting back the same state that we had before.
		var action_3 = editEntity({ id : action_2_id });
		var results = expense_group_child_by_id( state, action_3 );

		expect( typeof results[action_2_id] ).toBe("undefined");
		expect( results[action_1_id].edit ).toBe(false);
		expect( Object.keys(results).length ).toBe(1);
	});

	test("Will enable editing when there is a valid expense group object", () => {
		var action = addExpenseGroupChild( expense_group_child_action_helper );
		state = expense_group_child_by_id( state, action );
		var action_2 = editEntity( action );
		var results = expense_group_child_by_id( state, action_2 );

		expect( results[action.id].edit ).toBe(true);
	});

	////////////////////////
	// Save Edit Actions  //
	////////////////////////
	test("Will return initial state on cancelEditEntity action when we don't have specific entity", () => {
		var action_1 = addExpenseGroupChild( expense_group_child_action_helper );
		state = expense_group_child_by_id( state, action_1 );

		// Enable editing on expense group
		var action_2 = editEntity( action_1 );
		state = expense_group_child_by_id( state, action_2 );


		// Expect that we have an item in edit mode.
		expect( state[ action_1.id ].edit ).toBeTruthy();

		// Spawn a separate expense_group_child
		var action_3 = addExpenseGroupChild( expense_group_child_action_helper );

		// Spawn a save edit action on the separate expense_group_child
		var action_4 = saveEntity( action_3 );

		// Now apply the action to the current state
		var results = expense_group_child_by_id( state, action_4 );

		expect(Object.keys(results).length).toBe(1);

		expect( results[action_1.id].edit ).toBeTruthy();
	});

	test("Will successfully save an edit and revert to non-edit mode for that item", () => {
		// Feeding expense groups into state.
		var action_1 = addExpenseGroupChild( expense_group_child_action_helper );
		state = expense_group_child_by_id( state, action_1 );

		// Enable editing on expense group
		var action_2 = editEntity( action_1 );
		state = expense_group_child_by_id( state, action_2 );

		// Check and see that the editEntry action currently works
		expect(state[action_1.id].edit).toBeTruthy();

		// Cancel editing on expense group
		var action_3 = saveEntity( action_1 );

		// Now apply the cancel edit action to the state
		var results = expense_group_child_by_id( state, action_3 );

		// Check to see that we have successfully canceled an edit.
		expect(results[action_1.id].edit).toBeFalsy();
	});

	////////////////////////////////
	// CANCEL EDIT ENTITY ACTIONS //
	////////////////////////////////
	test("Will return initial state on cancelEditEntity action when we don't have specific entity", () => {
		// Feeding expense groups into state.
		var action_1 = addExpenseGroupChild( expense_group_child_action_helper );
		state = expense_group_child_by_id( state, action_1 );

		// Enable editing on expense group
		var action_2 = editEntity( action_1 );
		state = expense_group_child_by_id( state, action_2 );

		// Spawn a separate expense_group_child
		var action_3 = addExpenseGroupChild( expense_group_child_action_helper );

		// Spawn a cancel cancelEditEntity action on the separate expense_group_child
		var action_4 = cancelEditEntity( action_3 );

		// Now apply the action to the current state
		var results = expense_group_child_by_id( state, action_4 );

		// Should only have a length of one.
		expect(Object.keys(results).length).toBe(1);

		// Object in results should be currently editing
		expect(results[action_1.id].edit).toBeTruthy();
	});

	test("Will successfully cancel edit on a file currently set for edit", () => {
		// Feeding expense groups into state.
		var action_1 = addExpenseGroupChild( expense_group_child_action_helper );
		state = expense_group_child_by_id( state, action_1 );

		// Enable editing on expense group
		var action_2 = editEntity( action_1 );
		state = expense_group_child_by_id( state, action_2 );

		// Check and see that the editEntry action currently works
		expect(state[action_1.id].edit).toBeTruthy();

		// Cancel editing on expense group
		var action_3 = cancelEditEntity( action_1 );

		// Now apply the cancel edit action to the state
		var results = expense_group_child_by_id( state, action_3 );

		// Check to see that we have successfully canceled an edit.
		expect(results[action_1.id].edit).toBeFalsy();
	});
});

//////////////////////////////
// Expense Group Child XREF //
//////////////////////////////
describe("Expense Group Children XREF", () => {
	var state;

	beforeEach(() => {
		state = {};
	});

	test("Returns state object when not fed a type", () => {
		var action = addExpenseGroupChild( expense_group_child_action_helper );
		action.type = undefined;

		var results = expense_group_children_xref( state, action );
		expect( results ).toEqual({});
	});

	test("Returns state object when fed an undefined type", () => {

		var action = addExpenseGroupChild( expense_group_child_action_helper );
		action.type = "ADD_UR_MOM";

		var results = expense_group_children_xref( state, action );
		expect( results ).toEqual({});
	});

	test("Returns original state object when we're trying to delete an expense group that doesn't have children", () => {

		var action = removeExpenseGroup({ id : 0 });

		var results = expense_group_children_xref( state, action );
		expect( results ).toEqual({});
	});

	test("Adding Expense Group Child", () => {

		var parent_action = addExpenseGroup({ title : "A Test Expense Group" });
		var action = addExpenseGroupChild({
			...expense_group_child_action_helper,
			parentID : parent_action.id
		});

		var results = expense_group_children_xref( state, action );
		expect( results ).toEqual({
			[ parent_action.id ] : [ action.id ]
		});
	});

	test("Removing Expense Group Child", () => {
		state = {
			1 : [ 0, 1, 2 ]
		};

		var action = removeExpenseGroupChild({ id : 0, parentID: 1 });

		var results = expense_group_children_xref( state, action );
		expect( results ).toEqual({
			1 : [ 1, 2 ]
		});
	});

	test("Deletes Parent from state if there are no more xref children left", () => {
		state = {
			1 : [ 0 ]
		};

		var action = removeExpenseGroupChild({ id : 0, parentID : 1 });

		var results = expense_group_children_xref( state, action);
		expect( results ).toEqual({});
	});

	test("Removes an expense group and all of its children when we get a valid expense group removal action", () => {
		state = {
			1 : [ 0, 1, 2 ]
		};

		var action = removeExpenseGroup({ id : 1 });

		var results = expense_group_children_xref( state, action );
		expect( results ).toEqual({});
	});

	test("Removes an expense group and all of it's children when specified in a multiple expense group array", () => {
		state = {
			1 : [ 0, 1, 2],
			2 : [ 3, 4, 5]
		};

		var action = removeExpenseGroup({ id : 2 });

		var results = expense_group_children_xref( state, action );
		expect( results ).toEqual({
			1 : [ 0, 1, 2]
		});
	});
});