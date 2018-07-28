import C from "../constants.js";

// Reducer for "expense_groups_expense_group_children"
// Really don't know what this is for.
// export const expense_groups_expense_group_children = ( state={}, action ) => {
// 	if ( ( typeof action.type ) === "undefined" )
// 	{
// 		return state;
// 	}
// 	switch ( action.type ) {
// 		case C.ADD_EXPENSE_GROUP_CHILD:
// 			if ( typeof ( state[action.parentID] ) === "undefined" )
// 			{
// 				// Giving the state the initialized array so we can just add onto it.
// 				state = {
// 					...state,
// 					[action.parentID] : []
// 				};
// 			}
// 			return {
// 				...state,
// 				[ action.parentID ] : [
// 					...state[action.parentID],
// 					action.id
// 				]
// 			};

// 		case C.REMOVE_EXPENSE_GROUP:
// 			let { [ action.id.toString() ] : deleted, ...newState } = state;
// 			return newState;

// 		case C.REMOVE_EXPENSE_GROUP_CHILD:
// 			return {
// 				...state,
// 				[ action.parentID ] : state[action.parentID].filter(
// 					item => item !== action.id
// 				)
// 			};

// 		default:
// 			return state;
// 	}
// };

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
					timestamp : action.timestamp
				}
			};

		case C.REMOVE_EXPENSE_GROUP:
			let { [action.id.toString()] : deleted, ...newState} = state;
			return newState;

		default:
			return state;
	}
};