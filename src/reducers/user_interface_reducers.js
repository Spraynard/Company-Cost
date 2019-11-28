import C from "../constants.js";

export const user_interface = (state = {}, action) => {

	if (typeof action.type === "undefined") {
		return state;
	}

	const { type, ...actionData } = action;

	switch (type) {
		case C.UPDATE_USER_INTERFACE_STATE:
			return {
				...state,
				...actionData
			};

		default:
			return state;
	}
};