import C from "../constants";
import { filterFromObject } from "../helpers/helpers";

/**
 * Reducer for "expense_group_children"
 * This is meant to provide a pool of all the expense group children in our
 * application's state.
 */
export const expense_group_children = ( state=[], action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}
	switch ( action.type ) {
		case C.ADD_EXPENSE_GROUP_CHILD:
			return [
				...state,
				action.id
			];

		case C.REMOVE_EXPENSE_GROUP_CHILD:
			return state.filter(
				item => ( action.id !== item )
			);
		/**
		 * Through the expense_group_remove_helper middleware, we obtain action.expense_group_children_xref_ids.
		 * This is used to reference our state and remove out any items that are in the expense_group_children_xref_ids array.
		 */
		case C.REMOVE_EXPENSE_GROUP:
			return state.filter(
				item =>  ! action.expense_group_children_xref_ids.includes(item)
			);
		default:
			return state;
	}
};

/**
 * Reducer for "expense_group_child_by_id"
 * This is meant to hold all of the expense group children's data, per ID.
 */
export const expense_group_child_by_id = ( state={}, action ) => {

	const { id, type, ...action_data } = action;

	if ( typeof type === "undefined" )
	{
		return state;
	}

	switch ( type ) {
		case C.ADD_EXPENSE_GROUP_CHILD:
			return {
				...state,
				[ id ] : action_data
			};

		case C.REMOVE_EXPENSE_GROUP_CHILD:
			return filterFromObject([id.toString()], state);

		case C.EDIT_ENTITY:
			// Checking if ID is in this portion of state.
			if ( typeof state[ id ] === "undefined" )
			{
				return state;
			}

			return {
				...state,
				[ id ] : {
					...state[id],
					edit : true
				}
			};

		case C.REMOVE_EXPENSE_GROUP:
			return filterFromObject(
				Object.keys(state).filter(child_id => state[child_id].parentID === id),
				state
			);


		case C.SAVE_ENTITY:
			// Checking if ID is in this portion of state.
			if ( typeof state[ id ] === "undefined" )
			{
				return state;
			}

			return {
				...state,
				[ id ] : {
					...state[id],
					...action_data,
					edit : false
				}
			};

		case C.CANCEL_EDIT_ENTITY:
			// Checking if ID is in this portion of state.
			if ( typeof state[ id ] === "undefined" )
			{
				return state;
			}

			return {
				...state,
				[ id ] : {
					...state[id],
					edit : false
				}
			};

		case C.SET_SELECTED:
			if ( typeof state[id] === "undefined" )
			{
				return state;
			}
			return {
				...state,
				[id] : {
					...state[id],
					selected : action_data.selected
				}
			};

		default:
			return state;
	}
};

/**
 * Reducer for "expense_group_children_xref"
 * This is mean to provide a cross reference between an expense group child
 * and the parent expense group that contains it.
 */
export const expense_group_children_xref = ( state={}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}

	switch ( action.type ) {
		case C.ADD_EXPENSE_GROUP:
			// Populate the state with an empty array with a key of the expense group parent's ID.
			return {
				...state,
				[ action.id ] : []
			};

		case C.ADD_EXPENSE_GROUP_CHILD:
			return {
				...state,
				[ action.parentID ] : [
					...state[action.parentID],
					action.id
				]
			};
		/**
		 * I want to base my expense group child remove on the least amount of overhead possible.
		 * This means that, since I have access to the state with this reducer, that I have the chance
		 * to get a "parentID" from the "expense_group_child_by_id" object.
		 * I don't want to force this behavior, though, so I'll check and see if we are getting a supplied
		 * value or if we have to look for it.
		 */
		case C.REMOVE_EXPENSE_GROUP_CHILD:
			if ( typeof action.parentID === "undefined" && typeof state.expense_group_child_by_id === "object" ) {
				// This is where we try and find the parent ID.
				action.parentID = state.expense_group_child_by_id[action.id].parentID;
			}

			if ( typeof action.parentID !== "undefined" ) {
				const statePortionFiltered = {
					[ action.parentID ] : state[action.parentID].filter( item => item !== action.id )
				};

				state = {
					...state,
					...statePortionFiltered
				};
			}

			return state;

		case C.REMOVE_EXPENSE_GROUP:
			// This is checking to see if there's even an expense group witin this
			// portion of the state in the first place. If not, then we're just return the regular unchanged state.
			if ( typeof state[action.id] !== "undefined" )
			{
				var { [ action.id.toString() ] : deleted, ...newState } = state;
			}

			return ( typeof newState === "undefined" ) ? state : newState;

		default:
			return state;
	}
};