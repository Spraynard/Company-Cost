import C from "../constants.js";

export const items_edited = ( state = {}, action ) => {
	if ( ( typeof action.type ) === "undefined" )
	{
		return state;
	}

	switch ( action.type ) {
		/**
		 * When we want to edit an entity, we add whatever items
		 * we consider editable as a value to the item's I.D.-based key
		 */
		case C.EDIT_ENTITY:
			return state;

		/**
		 * Currently have no idea how I'm going to share the data between
		 * the items_edited portion of the state, which will contain
		 * all of the edited items, and their data, and the [Expense Group Type]_by_id state.
		 */
		case C.SAVE_ENTITY:
			return state;

		/**
		 * This should delete the entry that is currently available
		 * in the items_edited state.
		 */
		case C.CANCEL_EDIT_ENTITY:
			return state;
	}
};