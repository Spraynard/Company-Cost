const C = require("./constants.js");

// Controller reducer!!!
export const expenseGroupController = ( state={}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}

	if ( action.type === C.ADD_EXPENSE_GROUP ||
		action.type === C.REMOVE_EXPENSE_GROUP )
	{
		return {
			...state,
			expense_groups : expenseGroups(state["expense_groups"], action),
			expense_group_by_id : expenseGroup(state["expense_groups_by_id"], action),
			expense_groups_expense_group_children : expenseGroupsChildren(
				state["expense_groups_expense_group_children"],
				action
			)
		};
	}
	else
	{
		return state;
	}
};

// Abstracts addition of expense group child operations
export const expenseGroupChildController = ( state, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}
	console.log( state["expense_group_children_xref"]);
	if ( action.type === C.ADD_EXPENSE_GROUP_CHILD ||
		action.type === C.REMOVE_EXPENSE_GROUP_CHILD )
	{
		return {
			...state,
			expense_group_children : expenseGroupChildren( state["expense_group_children"], action ),
			expense_group_child_by_id : expenseGroupChild( state["expense_group_child_by_id"], action ),
			children_expense_group_xref : expenseGroupXrefferee( state["expense_group_children_xref"], action ),
		}
	}
}

// Reducer for "expense_groups_expense_group_children"
export const expenseGroupsChildren = ( state={}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}
	switch ( action.type ) {
		case C.ADD_EXPENSE_GROUP:
			return {
				...state,
				[ action.id ] : []
			};

		/**
		 * Can't do these nice little destructuring actions
		 * into the leaf of the branch without first initializing the branch.
		 */
		case C.ADD_EXPENSE_GROUP_CHILD:
			if ( typeof ( state[action.id] ) === "undefined" )
			{
				const { childID, ...rest } = action;

				const destructuredFeedAction = {
					...rest,
					type : C.ADD_EXPENSE_GROUP
				};
				// Giving the state the initialized array so we can just add onto it.
				state = expenseGroupsChildren( state, destructuredFeedAction );
			}
			return {
				...state,
				[ action.id ] : [
					...state[action.id],
					action.childID
				]
			};

		case C.REMOVE_EXPENSE_GROUP:
			let { [ action.id.toString() ] : deleted, ...newState } = state;
			return newState;

		case C.REMOVE_EXPENSE_GROUP_CHILD:
			return {
				...state,
				[ action.id ] : state[action.id].filter(
					item => item !== action.childID
				)
			};

		default:
			return state;
	}
};

// Reducer for "expense_groups"
export const expenseGroups = ( state=[], action ) => {
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
export const expenseGroup = ( state={}, action ) => {
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
export const expenseGroupChildren = ( state=[], action ) => {
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
export const expenseGroupChild = ( state={}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}
	switch ( action.type ) {
		case C.ADD_EXPENSE_GROUP_CHILD:
			return {
				...state,
				[ action.id ] : {
					name : action.name,
					description : action.description,
					cost : action.cost,
					costUOM : action.costUOM
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
export const expenseGroupXrefferee = ( state={}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}

	switch ( action.type ) {
		case C.ADD_EXPENSE_GROUP:
			return {
				...state,
				[action.id] : []
			};
		case C.ADD_EXPENSE_GROUP_CHILD:
			/* If the parent is not in the xref array yet, then we are going
				to force it into the array before we perform the add action.
			*/
			if ( typeof state[action.parentID] === "undefined" )
			{
				state = expenseGroupXrefferee( state, {
					type : C.ADD_EXPENSE_GROUP,
					id : action.parentID,
				})
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
					return item !== action.id
				})
			}

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