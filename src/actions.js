import C from "./constants";
import { v4 } from "uuid";
import {
	expense_group_editable_values,
	expense_group_child_editable_values
} from "./helpers/editHelpers";

///////////////////////////
// Expense Group Actions //
///////////////////////////
export const addExpenseGroup = ( _obj ) => ({
	type : C.ADD_EXPENSE_GROUP,
	id : v4(),
	timestamp : new Date().toString(),
	edit : false,
	...expense_group_editable_values( _obj ),
});

export const removeExpenseGroup = ({ id }) => ({
	type : C.REMOVE_EXPENSE_GROUP,
	id
});

export const addExpenseGroupChild = ( _obj ) => ({
	type : C.ADD_EXPENSE_GROUP_CHILD,
	id : v4(),
	parentID : _obj.parentID,
	timestamp : new Date().toString(),
	edit : false,
	...expense_group_child_editable_values( _obj )
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

//////////////////////////////
// OPTIONS HANDLING ACTIONS //
//////////////////////////////
export const editEntityOption = ( input_object ) => ({
	...input_object,
	type : C.EDIT_ENTITY_OPTION
});

export const openExpenseGroupOptionsDialog = ({ id }) => ({
	id,
	dialog_open : true,
	type : C.EDIT_ENTITY_OPTION
});

export const closeExpenseGroupOptionsDialog = ({ id }) => ({
	id,
	dialog_open : false,
	type : C.EDIT_ENTITY_OPTION
});

///////////////////////
// APP LEVEL ACTIONS //
///////////////////////
export const resetAppData = () => ({
	type : C.RESET_DATA
});