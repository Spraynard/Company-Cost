import C from "../constants.js";

export const application_options = ( state = {}, action ) => {

	if ( typeof action.type === "undefined" )
	{
		return state;
	}

	const { type, ...actionData } = action;

	switch ( type ) {
		case C.EDIT_APPLICATION_OPTION:
			return {
				...state,
				...actionData
			};

		default:
			return state;
	}
};