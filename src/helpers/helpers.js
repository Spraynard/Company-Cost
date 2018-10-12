export const extract_action_data = ( _obj ) => {
	let { id, type, ...actionData } = _obj;

	return actionData;
};

export const obtain_input_type = ( item ) => {
	let type = "";

	switch ( typeof item ) {
		case "number":
			type = "number";
			break;
		default:
			type = "text";
			break;
	}
	return type;
};

export const capitalizeFirstLetter = ( string ) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};