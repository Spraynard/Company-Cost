import C from "../../src/constants";
import { v4 } from "uuid";


/**
 * Expense Group Child specific reducers
 */
import {
	expense_group_entity_edit
} from "../../src/reducers/edit_mode_reducers";


import {
	editEntity,
	updateEntity,
	saveEntity,
	cancelEditEntity
} from "../../src/actions";

var state;
var actionID;
var action;

beforeEach(() => {
	state = {};

	actionID = v4();

	action = editEntity({
		id : actionID,
		title : "Hello there",
		parentID : 1
	});

	state = expense_group_entity_edit( state, action );
});

// Inserts
describe("Edit Entity", () => {

	test("Will insert all data except for id into the edit state", () => {
		expect( Object.keys(state[actionID]).length ).toBe(2);
	});

	test("Specific values check", () => {
		expect(state[actionID].title).toBe("Hello there");
		expect(state[actionID].parentID).toBe(1);
	});
});

describe("Update Entity", () => {
	// Create an expense group update action
	var action_2;
	var results;

	beforeEach(() => {
		action_2 = updateEntity({ id : actionID, title : "This is a new title and a new entity" });
		results = expense_group_entity_edit( state, action_2 );
	});
	test("Same ID in state after updating", () => {
		expect(results[actionID]).toBeDefined();
	});

	test("Not removing any parts of the original state", () => {
		expect( Object.keys(results[actionID]).length ).toBe(2);
	});

	test("Specific values check", () => {
		expect(results[actionID].title).toBe("This is a new title and a new entity");
		expect(results[actionID].parentID).toBe(1);
	});
});

describe("Save Entity", () => {

	test("Removes an entity from expense_group_entity_edit with only one entity", () => {
		var action_2 = saveEntity({ id: actionID });
		var results = expense_group_entity_edit(state, action_2);

		expect( results ).toEqual({});
	});

	test("Removes an entity from expense_group_entity_edit with multiple entities", () => {
		var actionID_2 = v4();
		var actionID_3 = v4();

		var action_2 = editEntity({
			id : actionID_2,
			title : "Hello there #2",
			parentID : 2
		});

		var action_3 = editEntity({
			id : actionID_3,
			title : "Hello there #3",
			parentID : 3
		});
		// First Edit
		state = expense_group_entity_edit( state, action_2 );

		// Second Edit. Should have three items in the state object now.
		state = expense_group_entity_edit( state, action_3 );

		expect( Object.keys(state).length ).toBe(3);

		// Now lets save the edit of one entity.

		var action_4 = saveEntity({ id : actionID_3 });

		var results = expense_group_entity_edit( state, action_4 );

		expect( Object.keys(results).length ).toBe(2);
		expect( results[actionID_3] ).toBeUndefined();
	});
});

describe("Cancel Edit Entity", () => {
	test("Removes an entity from expense_group_entity_edit with only one entity", () => {
		var action_2 = cancelEditEntity({ id: actionID });
		var results = expense_group_entity_edit(state, action_2);

		expect( results ).toEqual({});
	});

	test("Removes an entity from expense_group_entity_edit with multiple entities", () => {
		var actionID_2 = v4();
		var actionID_3 = v4();

		var action_2 = editEntity({
			id : actionID_2,
			title : "Hello there #2",
			parentID : 2
		});

		var action_3 = editEntity({
			id : actionID_3,
			title : "Hello there #3",
			parentID : 3
		});
		// First Edit
		state = expense_group_entity_edit( state, action_2 );

		// Second Edit. Should have three items in the state object now.
		state = expense_group_entity_edit( state, action_3 );

		expect( Object.keys(state).length ).toBe(3);

		// Now lets save the edit of one entity.

		var action_4 = cancelEditEntity({ id : actionID_3 });

		var results = expense_group_entity_edit( state, action_4 );

		expect( Object.keys(results).length ).toBe(2);
		expect( results[actionID_3] ).toBeUndefined();
	});
});
