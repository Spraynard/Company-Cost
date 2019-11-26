import C from "./constants";

import {
	obtainSelectProperties
} from "./helpers/helpers";

import {
	expenseGroupEditDataRef,
	expenseGroupChildEditDataRef
} from "./dataReferenceObjects";

// Log actions to the console as we dispatch them
export const logger = store => next => action => {
	let result;

	if ( process.env.NODE_ENV === "test" )
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
export const expense_group_child_remove_helper = store => next => action => {
	// Find out what kind of action we have
	if ( action.type === C.REMOVE_EXPENSE_GROUP_CHILD && typeof action.parentID === "undefined" )
	{
		let state = store.getState();
		let child_by_id_obj = state.expense_group_child_by_id;
		/**
		 * action.id is going to be the ID of the expense group child because of how
		 * C.REMOVE_EXPENSE_GROUP_CHILD is set up.
		 */
		let childrens_parent_id = child_by_id_obj[action.id].parentID;

		// Now we inject the parentID into the action
		action.parentID = childrens_parent_id;
	}

	return next(action);
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
		edited_item_content.cost = ( typeof edited_item_content.cost === "undefined" ) ?
			0.00
			:
			parseFloat( edited_item_content.cost );
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

	if ( action.type === C.REMOVE_EXPENSE_GROUP )
	{
		const expense_group_children_xref = store.getState()["expense_group_children_xref"];
		let expense_group_children_xref_ids = expense_group_children_xref[action.id];

		action = {
			...action,
			expense_group_children_xref_ids
		};
	}

	return next(action);
};