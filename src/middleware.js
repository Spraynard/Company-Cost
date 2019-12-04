/* eslint-disable no-console */

import C from "./constants";

import {
	obtainSelectProperties
} from "./helpers/helpers";

import {
	expenseGroupEditDataRef,
	expenseGroupChildEditDataRef
} from "./dataReferenceObjects";
import { saveEntity } from "./actions/entity_actions";

// Log actions to the console as we dispatch them
export const logger = store => next => action => {
	let result;

	if ( process.env.NODE_ENV === "test" || process.env.NODE_ENV === "production" )
	{
		return next(action);
	}

	console.groupCollapsed("Dispatching: ", action.type);
	console.log("Prev State: ", JSON.stringify(store.getState(), null, 4));
	console.log("Action: ", JSON.stringify(action, null, 4));
	result = next(action);
	console.log("Next State: ", JSON.stringify(store.getState(), null, 4));
	console.groupEnd();
	return result;
};

// On action, store the state into our localStorage object, which is mainly in the browser, but is being
// mocked here in this program under "local_stoarage_mock.js"
export const saver = store => next => action => {
	let result = next(action);
	localStorage["company_cost_store"] = JSON.stringify(store.getState());
	return result;
};

/**
 * Middleware that is specifically for tying some loose ends on an expense group child remove action.
 * Basically, if we are missing a parent ID from our action ( which is used by the expense_group_child_xref to filter out the expense group children )
 * we will add that data on the action based on our overall state.
 */
export const expense_group_child_add_parent_id = store => next => action => {

	if ( action.type !== C.REMOVE_EXPENSE_GROUP_CHILD || typeof action.parentID !== "undefined" )
	{
		return next(action);
	}

	const { expense_group_child_by_id } = store.getState();

	return next({ ...action, parentID : expense_group_child_by_id[action.id].parentID });
};

/**
 * Middleware that is specifically used when a users saves their edit.
 * We take the properties of our entity that have been edited and append the new
 * entity based data i
 * Basically we're going to take the material that has been edited in the
 * expense_group_entity_edit state, and overwrite the specifically id'd expense
 * group item in the main state depending on what type of
 */
export const expense_group_edit_save_helper = store => next => action => {

	if ( action.type !== C.SAVE_ENTITY )
	{
		return next(action);
	}

	const {
		expense_group_entity_edit,
		expense_group_child_by_id
	} = store.getState();

	const isIDAnExpenseGroupChild = expense_group_child_by_id.hasOwnProperty(action.id);

	let edited_item_content = expense_group_entity_edit[action.id];

	// Manipulations of the inserted content on save. Want to make sure we're saving numbers
	// as numbers, not strings.
	if ( isIDAnExpenseGroupChild )
	{
		edited_item_content.cost = (edited_item_content.cost) ?
			parseFloat(edited_item_content.cost)
			:
			0.00;


		if ( ! edited_item_content.costUOM && parseInt(edited_item_content.cost) )
		{
			edited_item_content.costUOM = "hour";
		}
	}

	// Insert edited item content into the action. This is a much needed procedure.
	action = {
		...action,
		...edited_item_content
	};

	// Returning the next action should delete the item out of the expense_group_edit_obj state
	return next(action);
};

/**
 * Here we are decorating our object before it gets to any reducer that deals with
 * the C.ENTITY_EDIT action.
 *
 * This has been a source of bugs before and was incredibly hard to find, so don't feel bad.
 */
export const entity_edit_helper = store => next => action => {
	if ( action.type !== C.EDIT_ENTITY )
	{
		return next(action);
	}

	const {
		expense_group_by_id,
		expense_group_child_by_id
	} = store.getState();

	// Get a full pool of the current entity states
	const combinedEntityState = {
		...expense_group_by_id,
		...expense_group_child_by_id
	};

	/** Resolves to a string, which is the id of the entity to edit. */
	const entity_to_edit = Object.keys( combinedEntityState )
		.filter( entityID => entityID === action.id ).shift();

	/** Chooses which data reference object to use to build our edit state values. */
	const dataRef = ( expense_group_child_by_id.hasOwnProperty(entity_to_edit) ) ?
		expenseGroupChildEditDataRef
		:
		expenseGroupEditDataRef;

	const editStateValues = obtainSelectProperties(
		dataRef,
		combinedEntityState[entity_to_edit]
	);

	action = {
		...action,
		...editStateValues
	};

	return next( action );
};

/**
 * Middleware that, on C.REMOVE_EXPENSE_GROUP action type, will assist
 * in removing all associated expense group children id's from expense_group_children
 */
export const expense_group_remove_helper = store => next => action => {

	if ( action.type !== C.REMOVE_EXPENSE_GROUP )
	{
		return next(action);
	}

	const expense_group_children_xref = store.getState()["expense_group_children_xref"];
	let expense_group_children_xref_ids = expense_group_children_xref[action.id];

	action = {
		...action,
		expense_group_children_xref_ids
	};

	return next(action);
};

/**
 * This function performs operations in which we ensure that there is only
 * one expense group child being edited at a time.
 */
export const expense_group_child_only_one_at_a_time = store => next => action => {
	if ( action.type !== C.EDIT_ENTITY )
	{
		return next(action);
	}

	const {
		expense_group_children,
		expense_group_child_by_id
	} = store.getState();

	if ( !expense_group_child_by_id.hasOwnProperty(action.id) )
	{
		return next(action);
	}

	const children_data = expense_group_children.map( child_id =>
		({ id: child_id, ...expense_group_child_by_id[child_id] })
	);

	for ( const child_object of children_data )
	{
		if (child_object.edit) {
			store.dispatch(saveEntity({ id: child_object.id }));
		}
	}

	return next(action);
};