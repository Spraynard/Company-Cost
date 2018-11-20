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

export const convertNumericalValue = ( value, value_uom, convert_uom ) => {
	let convert_map = {};

	switch ( convert_uom ) {
		case 'hour':
			convert_map.hour = 1; // Multiple the value by one.
			convert_map.day = 1 / 8; // 8 Hours in a day... Sometimes.
			convert_map.week = convert_map.day / 5; // 5 Days in a week
			convert_map.month = convert_map.week / 4; // 4 weeks in a month;
			convert_map.year = convert_map.month / 12
			break;
		case 'day':
			convert_map.hour = 8;
			convert_map.day = 1;
			convert_map.week = convert_map.day / 5;
			convert_map.month = convert_map.week / 4;
			convert_map.year = convert_map.month / 12;
			break;
		case 'week':
			convert_map.hour = 8 * 5;
			convert_map.day = 5;
			convert_map.week = 1;
			convert_map.month = convert_map.week / 4
			convert_map.year = convert_map.month / 12
			break;
		case 'month':
			convert_map.hour = 8 * 5 * 4;
			convert_map.day = 5 * 4;
			convert_map.week = 4;
			convert_map.month = 1;
			convert_map.year = convert_map.month / 12;
			break;
		case 'year':
			convert_map.hour = 8 * 5 * 4 * 12;
			convert_map.day = 5 * 4 * 12;
			convert_map.week = 4 * 12;
			convert_map.month = 12;
			convert_map.year = 1;
		default:
			break;
	}

	value = value * convert_map[value_uom];

	return value;
};

export const obtainChildCostTotal = ( children_array, children_value_array, current_options ) => {
	let current_options_cost_uom = current_options.costUOM;

	return children_array.reduce(( acc, current ) => {
		let child = children_value_array[current];
		let child_cost = child.cost;
		let child_cost_uom = child.costUOM;

		if ( ! child_cost_uom.length )
		{
			return acc;
		}

		if ( child_cost_uom !== current_options_cost_uom )
		{
			child_cost = convertNumericalValue(
				child_cost,
				child_cost_uom,
				current_options_cost_uom
			);
		}

		return acc + child_cost;
	}, 0);
}