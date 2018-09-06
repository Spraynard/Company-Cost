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

beforeEach(() => {
	state = {};
});

// Inserts
describe("Edit Entity", () => {
	test("Will add an entity with id key and ...rest values",() => {
		var actionID = v4();
		var action = editEntity({ id : actionID, title : "Hello there" });

		var results = expense_group_entity_edit( state, action );

		expect( results ).toEqual({
			[ actionID ] : {
				title : "Hello there"
			}
		});
	});
});

describe("Update Entity", () => {

});

describe("Save Entity", () => {

});

describe("Cancel Edit Entity", () => {

});
