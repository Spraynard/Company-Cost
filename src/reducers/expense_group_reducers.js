import C from "../constants.js";

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
		case C.ADD_EXPENSE_GROUP:
			return [
				...state,
				action.id
			];
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
	switch ( action.type ) {
		case C.ADD_EXPENSE_GROUP:
			return {
				...state,
				[ action.id ] : {
					title : action.title,
					timestamp : action.timestamp,
					edit : action.edit
				}
			};

		case C.REMOVE_EXPENSE_GROUP:
			let { [action.id.toString()] : deleted, ...newState} = state;
			return newState;

		case C.EDIT_ENTITY:
			// Checking if ID is in this portion of state.
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

		// todo... have no idea how to implement this.
		case C.SAVE_ENTITY:
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