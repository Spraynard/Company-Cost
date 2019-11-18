// Importing action generators
import {
	addExpenseGroup,
	removeExpenseGroup,
	addExpenseGroupChild,
	removeExpenseGroupChild,
	openExpenseGroupOptionsDialog,
	closeExpenseGroupOptionsDialog
} from "../../src/actions/expense_group_actions";

import {
	editEntity,
	saveEntity,
	cancelEditEntity,
	editEntityOption,
} from "../../src/actions/entity_actions";

// Importing Constants
import C from "../../src/constants";

/////////////////////////////////////////////////////
// Expense Group and Expense Group Child Additions //
/////////////////////////////////////////////////////
describe("Add Expense Group", () => {
	var actionObject = {};
	var action;
	beforeAll(() => {
		actionObject.title = "Expense Group Addition Test";
		action = addExpenseGroup(actionObject);
	});

	test("Expense Group Object Structure", () => {
		expect(action.type).toBe(C.ADD_EXPENSE_GROUP);
		expect(action.id.length).toBe(36);
		expect(action.title).toBe(actionObject.title);
		// Missing timestamp
		expect(action.edit).toBe(false);
	});
});
describe("Add Expense Group Child", () => {

	var actionObject = {};
	var action;

	beforeAll(() => {
		actionObject.title = "Expense Group Child Addition Test";
		actionObject.description = "A test of the expense group child addition behavior";
		actionObject.cost = 1.00;
		actionObject.costUOM = "hour",
		actionObject.parentID = 1;
		action = addExpenseGroupChild(actionObject);
	});

	test("Expense Group Object Structure", () => {
		expect(action.type).toBe(C.ADD_EXPENSE_GROUP_CHILD);
		expect(action.id.length).toBe(36);
		expect(action.parentID).toBe(actionObject.parentID);
		expect(action.title).toBe(actionObject.title);
		expect(action.description).toBe(actionObject.description);
		expect(action.cost).toBe(actionObject.cost);
		expect(action.costUOM).toBe(actionObject.costUOM);
		expect(action.edit).toBe(false);
	});
});

////////////////////////////////////////////////////
// Expense Group and Expense Group Child Removals //
////////////////////////////////////////////////////
describe("Remove Expense Group", () => {
	var actionObject = {},
		action;
	beforeAll(() => {
		actionObject.id = 2;
		action = removeExpenseGroup(actionObject);
	});

	test("Expense Group Object Structure", () => {
		expect(action.type).toBe(C.REMOVE_EXPENSE_GROUP);
		expect(action.id).toBe(actionObject.id);
	});
});
describe("Remove Expense Group Child", () => {
	var actionObject = {},
		action;
	beforeAll(() => {
		actionObject.id = 2;
		action = removeExpenseGroupChild(actionObject);
	});
	test("Expense Group Object Structure", () => {
		expect(action.type).toBe(C.REMOVE_EXPENSE_GROUP_CHILD);
		expect(action.id).toBe(actionObject.id);
	});
});

/////////////////////////
// Actions for editing //
/////////////////////////
import { v4 } from "uuid";
describe("Enabling edit mode", () => {
	var expenseGroupID;
	var action;

	beforeEach(() => {
		expenseGroupID = v4();
	});

	test("Sends out an expense group edit action", () => {
		action = editEntity({ id : expenseGroupID });

		expect(action.type).toBe(C.EDIT_ENTITY);
		expect(action.id).toBe(expenseGroupID);
	});
});

describe("Cancelling edit mode", () => {
	var expenseGroupID;
	var action;

	beforeEach(() => {
		expenseGroupID = v4();
	});

	test("Sends out an expense group edit cancel action", () => {
		action = cancelEditEntity({ id : expenseGroupID });

		expect(action.type).toBe(C.CANCEL_EDIT_ENTITY);
		expect(action.id).toBe(expenseGroupID);
	});
});

describe("Saving Edit Mode Changes", () => {
	var expenseGroupID;
	var action;

	beforeEach(() => {
		expenseGroupID = v4();
	});

	test("Sends out an expense group edit save action", () => {
		action = saveEntity({ id : expenseGroupID });

		expect(action.type).toBe(C.SAVE_ENTITY);
		expect(action.id).toBe(expenseGroupID);
	});
});

//////////////////////////////
// Options Handling Actions //
//////////////////////////////
describe("Saving Entity Edit Option Changes", () => {
	let id;
	let action;

	beforeEach(() => {
		id = v4();
	});

	test("Sends out an expense group option save action", () => {
		action = editEntityOption({
			id,
			costUOM : "day",
			size : "default",
			dialog_open : true
		});

		expect( action.type ).toBe(C.EDIT_ENTITY_OPTION);
		expect(action.id).toBe(id);
		expect(action.costUOM).toBe("day");
		expect(action.size).toBe("default");
		expect(action.dialog_open).toBeTruthy();
	})
});

describe("Open Expense Group Option Dialog", () => {
	let id = v4();
	let action = openExpenseGroupOptionsDialog({ id });

	expect(action.type).toBe(C.EDIT_ENTITY_OPTION);
	expect(action.id).toBe(id);
	expect(action.dialog_open).toBeTruthy();
});

describe("Close Expense Group Option Dialog", () => {
	let id = v4();
	let action = closeExpenseGroupOptionsDialog({ id });

	expect(action.type).toBe(C.EDIT_ENTITY_OPTION);
	expect(action.id).toBe(id);
	expect(action.dialog_open).toBeFalsy();
});
