// Importing action generators
import {
	addExpenseGroup,
	removeExpenseGroup,
	addExpenseGroupChild,
	removeExpenseGroupChild
} from "../../src/actions";

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