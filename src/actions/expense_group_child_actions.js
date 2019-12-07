import { v4 } from "uuid";
import C from "../constants";
import {
	expense_group_child_editable_values
} from "../helpers/editHelpers";

export const addExpenseGroupChild = (_obj) => ({
	type: C.ADD_EXPENSE_GROUP_CHILD,
	id: v4(),
	parentID: _obj.parentID,
	timestamp: new Date().toString(),
	edit: false,
	selected: _obj.selected || false,
	...expense_group_child_editable_values(_obj)
});

export const removeExpenseGroupChild = ({ id, parentID }) => ({
	type: C.REMOVE_EXPENSE_GROUP_CHILD,
	id,
	parentID
});

export const selectExpenseGroupChild = ({ id }) => ({
	id,
	selected: true,
	type: C.SET_SELECTED
});

export const unselectExpenseGroupChild = ({ id }) => ({
	id,
	selected: false,
	type: C.SET_SELECTED
});