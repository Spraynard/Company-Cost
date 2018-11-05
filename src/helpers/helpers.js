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

export const convertToPerDay = ( value ) => {

}

export const convertNumericalValue = ( value, value_uom, convert_uom ) => {
	let convert_map = {};

	switch ( convert_uom ) {
		case 'hour':
			convert_map.hour = 1; // Multiple the value by one.
			convert_map.day = 1 / 8; // 8 Hours in a day... Sometimes.
			convert_map.week = convert_map.day / 5; // 5 Days in a week
			convert_map.month = convert_map.week / 4; // 4 weeks in a month;
			break;
		case 'day':
			convert_map.hour = 8;
			convert_map.day = 1;
			convert_map.week = convert_map.day / 5;
			convert_map.month = convert_map.week / 4;
			break;
		case 'week':
			convert_map.hour = 8 * 5;
			convert_map.day = 5;
			convert_map.week = 1;
			convert_map.month = 1 / 4;
			break;
		case 'month':
			convert_map.hour = 8 * 5 * 4;
			convert_map.day = 5 * 4;
			convert_map.week = 4;
			convert_map.month = 1;
			break;
		default:
			break;
	}

	value = value * convert_map[value_uom];

	return value;
};