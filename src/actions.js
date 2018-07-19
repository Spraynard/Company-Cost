import C from './constants';
import { v4 } from 'uuid';

export const addExpenseGroup = title => ({
	type : C.ADD_EXPENSE_GROUP,
	id : v4(),
	title : title,
	timestamp : new Date().toString()
})

export const removeExpenseGroup = id => ({
	type : C.REMOVE_EXPENSE_GROUP,
	id : id
});

export const addExpenseGroupChild = ( title, description, cost, costUOM ) => ({
	type : C.ADD_EXPENSE_GROUP_CHILD,
	id : v4(),
	title : title,
	description : description,
	cost : cost,
	costUOM : costUOM,
	timestamp : new Date().toString()
});

export const removeExpenseGroupChild = id => ({
	type : C.REMOVE_EXPENSE_GROUP_CHILD,
	id : id
})