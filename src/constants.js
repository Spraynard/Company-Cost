// These are action types that will be used within the app
const constants = {
	/* Expense group action constant */
	ADD_EXPENSE_GROUP : "ADD_EXPENSE_GROUP",
	REMOVE_EXPENSE_GROUP : "REMOVE_EXPENSE_GROUP",

	/* Children of expense groups action constants */
	ADD_EXPENSE_GROUP_CHILD : "ADD_EXPENSE_GROUP_CHILD",
	REMOVE_EXPENSE_GROUP_CHILD : "REMOVE_EXPENSE_GROUP_CHILD",

	/* Constants used for item editing */
	EDIT_ENTITY : "EDIT_ENTITY",
	SAVE_ENTITY : "SAVE_ENTITY",
	ENTITY_CANCEL_EDIT : "ENTITY_CANCEL_EDIT"
};

module.exports = constants;