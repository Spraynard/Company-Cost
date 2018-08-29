import C from "./constants";
import { v4 } from "uuid";

///////////////////////////
// Expense Group Actions //
///////////////////////////
export const addExpenseGroup = ({ title }) => ({
	type : C.ADD_EXPENSE_GROUP,
	id : v4(),
	title,
	timestamp : new Date().toString(),
	edit : false
});

export const removeExpenseGroup = ({ id }) => ({
	type : C.REMOVE_EXPENSE_GROUP,
	id
});

export const addExpenseGroupChild = ({ title, description, cost, costUOM, parentID }) => ({
	type : C.ADD_EXPENSE_GROUP_CHILD,
	id : v4(),
	parentID,
	title,
	description,
	cost,
	costUOM,
	timestamp : new Date().toString(),
	edit : false
});

export const removeExpenseGroupChild = ({ id, parentID }) => ({
	type : C.REMOVE_EXPENSE_GROUP_CHILD,
	id,
	parentID
});

///////////////////////////////
// User control edit actions //
///////////////////////////////
export const editEntity = ({ id, ...rest }) => ({
	type : C.EDIT_ENTITY,
	id,
	...rest
});

export const updateEntity = ({ id, ...rest }) => ({
	type : C.UPDATE_ENTITY,
	id,
	...rest
});

export const saveEntity = ({ id }) => ({
	type : C.SAVE_ENTITY,
	id
});

export const cancelEditEntity = ({ id }) => ({
	type : C.CANCEL_EDIT_ENTITY,
	id
});
