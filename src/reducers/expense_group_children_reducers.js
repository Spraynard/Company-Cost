import C from "../constants.js";

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
				item => action.id !== item
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
					parentID : action.parentID,
					edit : action.edit
				}
			};

		case C.REMOVE_EXPENSE_GROUP_CHILD:
			let { [action.id.toString()] : deleted, ...newState } = state;
			return newState;

		// todo
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
					...state[action.id],
					...action_data,
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
		/**
		 * I want to base my expense group child remove on the least amount of overhead possible.
		 * This means that, since I have access to the state with this reducer, that I have the chance
		 * to get a "parentID" from the "expense_group_child_by_id" object.
		 * I don't want to force this behavior, though, so I'll check and see if we are getting a supplied
		 * value or if we have to look for it.
		 */
		case C.REMOVE_EXPENSE_GROUP_CHILD:
			if ( typeof action.parentID === "undefined" && typeof state.expense_group_child_by_id === "object" )
			{
				// This is where we try and find the parent ID.
				action.parentID = state.expense_group_child_by_id[action.id].parentID;
			}

			// This is where we return a state object even on epic fail.
			if ( typeof action.parentID === "undefined" )
			{
				return state;
			}

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

		case C.REMOVE_EXPENSE_GROUP:
			// This is checking to see if there's even an expense group witin this
			// portion of the state in the first place. If not, then we're just return the regular unchanged state.
			if ( typeof state[action.id] === "undefined" )
			{
				return state;
			}

			let { [ action.id.toString() ] : deleted, ...newState } = state;
			return newState;

		default:
			return state;
	}
};