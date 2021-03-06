// These are action types that will be used within the app
const constants = {
	/* Expense group action constant */
	ADD_EXPENSE_GROUP : 			"ADD_EXPENSE_GROUP",
	REMOVE_EXPENSE_GROUP : 			"REMOVE_EXPENSE_GROUP",

	/* Children of expense groups action constants */
	ADD_EXPENSE_GROUP_CHILD : 		"ADD_EXPENSE_GROUP_CHILD",
	REMOVE_EXPENSE_GROUP_CHILD : 	"REMOVE_EXPENSE_GROUP_CHILD",

	/* Constants used for item editing */
	EDIT_ENTITY : 					"EDIT_ENTITY",
	SAVE_ENTITY : 					"SAVE_ENTITY",
	UPDATE_ENTITY : 				"UPDATE_ENTITY",
	CANCEL_EDIT_ENTITY : 			"CANCEL_EDIT_ENTITY",

	/* Constants used for Options Handling */
	EDIT_ENTITY_OPTION: 			"EDIT_ENTITY_OPTION",

	/* App Level Action Types */
	RESET_DATA : 					"RESET_DATA",
	EDIT_APPLICATION_OPTION : 		"EDIT_APPLICATION_OPTION",

	/* User Interface Action Types */
	UPDATE_USER_INTERFACE_STATE : 		"UPDATE_USER_INTERFACE_STATE"
};

module.exports = constants;