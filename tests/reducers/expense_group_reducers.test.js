import C from "../../src/constants";

/**
 * Expense_Group specific reducers
 */
import {
	expense_groups,
	expense_group_by_id,
} from "../../src/reducers/expense_group_reducers";


// Importing actions to use. These should work and be tested out correctly.
import {
	addExpenseGroup,
	removeExpenseGroup,
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
});