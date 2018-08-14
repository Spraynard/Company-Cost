import C from "../../src/constants";

/**
 * Expense_Group specific reducers
 */
import {
	expense_groups,
	expense_group_by_id,
} from "../../src/reducers/expense_group_reducers";

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
	addExpenseGroup,
	removeExpenseGroup,
	addExpenseGroupChild,
	removeExpenseGroupChild
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

describe("Expense Group", () => {
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
});

describe("Expense GroupChildren", () => {
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
		// var action = {
		// 	type : C.ADD_EXPENSE_GROUP_CHILD,
		// 	id : 0
		// };

		var action = addExpenseGroupChild( expense_group_child_action_helper );

		var results = expense_group_children( state, action );
		expect( results[0].length ).toBe(36);
	});

	test("Will remove an expense group ID from the state array", () => {
		state = [ 1, 2, 3, 4 ];

		// var action = {
		// 	type: C.REMOVE_EXPENSE_GROUP_CHILD,
		// 	id : 2
		// };

		var action = removeExpenseGroupChild({ id : 2 });

		var results = expense_group_children( state, action );
		expect( results ).toEqual([ 1, 3, 4 ]);
	});
});

describe("Expense GroupChild", () => {
	var state;

	beforeEach(() => {
		state = {};
	});

	test("Returns state on action not having a type", () => {
		// var action = {
		// 	id : 0,
		// 	childID : 1,
		// };

		var action = addExpenseGroupChild( expense_group_child_action_helper );
		action.type = undefined;

		var results = expense_group_child_by_id( state, action );
		expect( results ).toEqual({});
	});

	test("Will add an expense group child to uninitialized state.", () => {
		// var action = {
		// 	type : C.ADD_EXPENSE_GROUP_CHILD,
		// 	id : 0,
		// 	title : "test",
		// 	description : "this is a test",
		// 	cost : 12.03,
		// 	costUOM : "hour"
		// };

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
});

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