import C from "./constants";
import { v4 } from "uuid";

///////////////////////////
// Expense Group Actions //
///////////////////////////
export const addExpenseGroup = ( _obj ) => ({
	type : C.ADD_EXPENSE_GROUP,
	id : v4(),
	title : _obj.title || "",
	description : _obj.description || "",
	timestamp : new Date().toString(),
	edit : false
});

export const removeExpenseGroup = ({ id }) => ({
	type : C.REMOVE_EXPENSE_GROUP,
	id
});

export const addExpenseGroupChild = ( _obj ) => ({
	type : C.ADD_EXPENSE_GROUP_CHILD,
	id : v4(),
	parentID : _obj.parentID,
	title : _obj.title,
	description: _obj.description,
	cost: _obj.cost || 0,
	costUOM: _obj.costUOM,
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
export const editEntity = ( input_object ) => ({
	...input_object,
	type : C.EDIT_ENTITY
});

export const updateEntity = ( input_object ) => ({
	...input_object,
	type : C.UPDATE_ENTITY
});

export const saveEntity = ({ id }) => ({
	type : C.SAVE_ENTITY,
	id
});

export const cancelEditEntity = ({ id }) => ({
	type : C.CANCEL_EDIT_ENTITY,
	id
});

///////////////////////
// APP LEVEL ACTIONS //
///////////////////////
export const resetAppData = () => ({
	type : C.RESET_DATA
});