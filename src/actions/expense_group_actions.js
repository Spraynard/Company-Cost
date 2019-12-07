import { v4 } from "uuid";
import { expense_group_editable_values } from "../helpers/editHelpers";
import * as config from "../../config/config.json";
import C from "../constants";

export const addExpenseGroup = (_obj = {}) => ({
	type: C.ADD_EXPENSE_GROUP,
	id: v4(),
	timestamp: new Date().toString(),
	edit: false,
	title : config.default_expense_group_title,
	...expense_group_editable_values(_obj),
});

export const removeExpenseGroup = ({ id }) => ({
	type: C.REMOVE_EXPENSE_GROUP,
	id
});

export const openExpenseGroupOptionsDialog = ({ id }) => ({
	id,
	dialog_open: true,
	type: C.EDIT_ENTITY_OPTION
});

export const closeExpenseGroupOptionsDialog = ({ id }) => ({
	id,
	dialog_open: false,
	type: C.EDIT_ENTITY_OPTION
});