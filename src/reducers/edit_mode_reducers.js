import C from "../constants.js";

export const expense_group_entity_edit = ( state = {}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}

	/**
	 * ######################
	 * EDIT / UPDATE ENTITY #
	 * ######################
	 * Used when editing or updating an expense group entity's information
	 *
	 * The operations we perform are as follows:
	 * 	1. Take out the `id` and `edit` parameter
	 * 	2. Shove the rest of the action parameters into a variable called `rest`
	 * 	3. Return a state object with with previous state and add an `id`-keyed object
	 *  	with a `rest` value, effectively supplying the new object with all necessary info
	 */

	if (
		action.type === C.EDIT_ENTITY ||
		action.type === C.UPDATE_ENTITY
	) {
		let {
			id,
			edit,
			type,
			...rest
		} = action;
		return {
			...state,
			[ id ] : {
				...rest
			}
		};
	}
	/**
	 * ###########################
	 * SAVE / CANCEL EDIT ENTITY #
	 * ###########################
	 * For the `expense_group_entity_edit` portion of the store,
	 * all we need to do is remove the `id`-keyed object from the state
	 * as we are saving the changes that were made.
	 *
	 * This is the same for canceling the edit on the selected entity
	 */
	else if (
		action.type === C.SAVE_ENTITY ||
		action.type === C.CANCEL_EDIT_ENTITY
	) {
		let { [ action.id.toString() ] : deleted, ...newState } = state;
		return newState;
	}
	// switch ( action.type ) {

	// 	case C.EDIT_ENTITY:
	// 		let {
	// 			id,
	// 			edit,
	// 			...rest
	// 		} = action;
	// 		return {
	// 			...state,
	// 			[ id ] : {
	// 				...rest
	// 			}
	// 		};

	// 	/**
	// 	 * ###############
	// 	 * UPDATE ENTITY #
	// 	 * ###############
	// 	 * This is for when we are updating an entity while it is in edit mode.
	// 	 * All of the updated values should be within the actual action.
	// 	 *
	// 	 * The operations we perform are roughly the same as C.EDIT_ENTITYs action,
	// 	 * except we use this action to overwrite the values in the object with given
	// 	 * values in the `action` object.
	// 	 */
	// 	case C.UPDATE_ENTITY:
	// 		let {
	// 			id,
	// 			edit,
	// 			...rest
	// 		} = action;
	// 		return {
	// 			...state,
	// 			[ id ] : {
	// 				...rest
	// 			}
	// 		};

	// 	case C.SAVE_ENTITY:
	// 		// wrapping [] around the action.id.toString() gives
	// 		// us the whole object used with that ID.
	// 		let { [ action.id.toString() ] : deleted, ...newState } = state;
	// 		return newState;

	// 	/**
	// 	 * ####################
	// 	 * CANCEL EDIT ENTITY #
	// 	 * ####################
	// 	 * This should delete the entry that is currently available
	// 	 * in the items_edited state.
	// 	 */
	// 	case C.CANCEL_EDIT_ENTITY:
	// 		let { [ action.id.toString() ] : deleted, ...newState } = state;
	// 		return newState;
	// }
};