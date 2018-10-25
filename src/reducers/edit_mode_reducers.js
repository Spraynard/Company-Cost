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

		var oldState = state[id];

		return {
			...state,
			[ id ] : {
				...oldState,
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

	///////////////////////////////////////////
	// On default, return the original state //
	///////////////////////////////////////////
	return state;
};

export const expense_group_options = ( state = {}, action ) => {
	return state;
}