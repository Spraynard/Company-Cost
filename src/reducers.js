const C = require("./constants.js");

// Reducer for "expense_groups_expense_group_children"
export const expense_groups_expense_group_children = ( state={}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}
	switch ( action.type ) {
		case C.ADD_EXPENSE_GROUP_CHILD:
			if ( typeof ( state[action.parentID] ) === "undefined" )
			{
				// Giving the state the initialized array so we can just add onto it.
				state = {
					...state,
					[action.parentID] : []
				};
			}
			return {
				...state,
				[ action.parentID ] : [
					...state[action.parentID],
					action.id
				]
			};

		case C.REMOVE_EXPENSE_GROUP:
			let { [ action.id.toString() ] : deleted, ...newState } = state;
			return newState;

		case C.REMOVE_EXPENSE_GROUP_CHILD:
			return {
				...state,
				[ action.parentID ] : state[action.parentID].filter(
					item => item !== action.id
				)
			};

		default:
			return state;
	}
};

// Reducer for "expense_groups"
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

// Reducer for "expense_group_children"
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
				item => action.id !== item
			);
		default:
			return state;
	}
};

// Reducer for "expense_group_child_by_id"
export const expense_group_child_by_id = ( state={}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}
	switch ( action.type ) {
		case C.ADD_EXPENSE_GROUP_CHILD:
			return {
				...state,
				[ action.id ] : {
					title : action.title,
					description : action.description,
					cost : action.cost,
					costUOM : action.costUOM,
					timestamp : action.timestamp,
					parentID : action.parentID
				}
			};

		case C.REMOVE_EXPENSE_GROUP_CHILD:
			let { [action.id.toString()] : deleted, ...newState } = state;
			return newState;

		default:
			return state;
	}
};

// Reducer for "expense_group_children_xref"
export const expense_group_children_xref = ( state={}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}

	switch ( action.type ) {
		case C.ADD_EXPENSE_GROUP_CHILD:
			/* If the parent is not in the xref array yet, then we are going
				to force it into the array before we perform the add action.
			*/
			if ( typeof state[action.parentID] === "undefined" )
			{
				state = {
					...state,
					[ action.parentID ] : []
				};
			}

			return {
				...state,
				[ action.parentID ] : [
					...state[action.parentID],
					action.id
				]
			};
		case C.REMOVE_EXPENSE_GROUP_CHILD:
			state = {
				...state,
				[ action.parentID ] : state[action.parentID].filter( item => {
					return item !== action.id;
				})
			};

			/* Complete removal from this state if there are no more references left for a parent */
			if ( state[ action.parentID ].length === 0 )
			{
				let { [action.parentID.toString()] : deleted, ...newState } = state;
				return newState;
			}

			return state;

		default:
			return state;
	}
}