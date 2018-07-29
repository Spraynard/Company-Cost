import C from "./constants";
import { v4 } from "uuid";

export const addExpenseGroup = ({ title }) => ({
	type : C.ADD_EXPENSE_GROUP,
	id : v4(),
	title,
	timestamp : new Date().toString()
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
	timestamp : new Date().toString()
});

export const removeExpenseGroupChild = ({ id }) => ({
	type : C.REMOVE_EXPENSE_GROUP_CHILD,
	id
});