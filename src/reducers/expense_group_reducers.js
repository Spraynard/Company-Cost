import C from "../constants.js";
import { extract_action_data } from "../helpers/helpers";
/**
 * Reducer for "expense_groups".
 * This is meant to provide an array listing of all of the expense groups
 * that are in the current state.
 */
export const expense_groups = ( state=[], action ) => {

	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}
	switch ( action.type ) {

		// Basic addition of an ID into this area of the state, basically just giving us a listing of the expense groups overall
		case C.ADD_EXPENSE_GROUP:
			return [
				...state,
				action.id
			];

		// Basic subtraction of an ID that is in this portion of the state out of the state.
		case C.REMOVE_EXPENSE_GROUP:
			return state.filter(
				item => action.id !== item
			);

		default:
			return state;
	}
};

// Reducer for "exense_group_by_id"
export const expense_group_by_id = ( state={}, action ) => {

	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}

	let actionData = extract_action_data( action );

	switch ( action.type ) {
		// Adds data to the expense_group_by_id state with specific values that are needed in order to have a basic expense group,
		// along with initializer values.

		case C.ADD_EXPENSE_GROUP:

			return {
				...state,
				[ action.id ] : {
					...actionData
				}
			};

		// Deletes the expense group entity out of the expense_group_by_id state.
		case C.REMOVE_EXPENSE_GROUP:
			let { [action.id.toString()] : deleted, ...newState} = state;
			return newState;

		// Flags an expense group ( found by the given id ) as being edited.
		case C.EDIT_ENTITY:
			if ( typeof state[ action.id ] === "undefined" )
			{
				return state;
			}

			return {
				...state,
				[ action.id ] : {
					...state[action.id],
					edit : true
				}
			};

		/**
		 * Implementation notes:
		 * In order to save changes, there is a middleware function being run that checks for every
		 * C.SAVE_ENTITY that gets passed. This middleware takes the ID given within the action and does a lookup for the "edited"
		 * data within the specific state object. It then injects that data into the object and runs the C.SAVE_ENTITY action with that given edited data!!!
		 */
		case C.SAVE_ENTITY:
			// Checking if ID is in this portion of state.
			if ( typeof state[ action.id ] === "undefined" )
			{
				return state;
			}

			let { id, type, ...action_data } = action;

			return {
				...state,
				[ action.id ] : {
					...state[action.id], // This contains all of the regular data from the state object, possibly to be overwritten
					...action_data, // This will contain all of the data that was edited and is now getting saved.
					edit : false
				}
			};

		// Flags the specific expense_group entity as not being editable anymore.
		case C.CANCEL_EDIT_ENTITY:
			// Checking if ID is in this portion of state.
			if ( typeof state[ action.id ] === "undefined" )
			{
				return state;
			}

			return {
				...state,
				[ action.id ] : {
					...state[action.id],
					edit : false
				}
			};

		default:
			return state;
	}
};