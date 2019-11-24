export const extract_action_data = ( _obj ) => {
	// eslint-disable-next-line no-unused-vars
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
		case "hour":
			convert_map.hour = 1; // Multiple the value by one.
			convert_map.day = 1 / 8; // 8 Hours in a day... Sometimes.
			convert_map.week = convert_map.day / 5; // 5 Days in a week
			convert_map.month = convert_map.week / 4; // 4 weeks in a month;
			convert_map.year = convert_map.month / 12;
			break;
		case "day":
			convert_map.hour = 8;
			convert_map.day = 1;
			convert_map.week = convert_map.day / 5;
			convert_map.month = convert_map.week / 4;
			convert_map.year = convert_map.month / 12;
			break;
		case "week":
			convert_map.hour = 8 * 5;
			convert_map.day = 5;
			convert_map.week = 1;
			convert_map.month = convert_map.week / 4;
			convert_map.year = convert_map.month / 12;
			break;
		case "month":
			convert_map.hour = 8 * 5 * 4;
			convert_map.day = 5 * 4;
			convert_map.week = 4;
			convert_map.month = 1;
			convert_map.year = convert_map.month / 12;
			break;
		case "year":
			convert_map.hour = 8 * 5 * 4 * 12;
			convert_map.day = 5 * 4 * 12;
			convert_map.week = 4 * 12;
			convert_map.month = 12;
			convert_map.year = 1;
			break;
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
};

export const obtainSelectProperties = ( a, b, _opts = {} ) => {
	for ( const prop in a )
	{
		if ( b.hasOwnProperty( prop ) )
		{
			a[prop] = b[prop];

			// Transform the property that we just obtained from
			if ( typeof _opts.transform !== "undefined" )
			{
				a[prop] = ( typeof _opts.transform[prop] === "function" ) ? _opts.transform[prop]( a[prop] ) : a[prop];
			}
		}
	}
	return a;
};

export const moneyFormat = cost => `$${cost}`;
/**
 * Reduces an object into a list of filtered keys.
 * The keys that are returned are those of the objects whose given attribute equals a given value
 * Filters to include a list of objects who have an attribute equal to the value
 *
 * @param {array} keyed_object - An object with keys
 * @param {string} attribute - Attribute or property of object
 * @param {any} value - Value to compare our attribute or property against
 * @returns {array} - List of filtered object keys
 */
export const filterKeyedObjectListByAttribute = ( keyed_object, attribute, value ) =>
	Object.keys(keyed_object)
		.filter( key =>
			keyed_object[key][attribute] === value
		);

/**
 * Maps over a key list.
 *
 * @param {array} key_list - list of keys to map over
 * @param {object} reference_object - object to extract data from
 * @param {string} include_key - If given, attaches a key under a name given by the parameter
 * @returns {array} - List of keyed object data in our reference object
 */
export const mapOverKeys = ( key_list, reference_object, include_key="" ) =>
	key_list.map( key => ( include_key ) ?
		{ [include_key] : key, ...reference_object[key] }
		:
		reference_object[key]
	);

/**
 * Helper function to get a full list of children available for an expense group
 *
 * @param {string} id - id of the expense group you would like to find children for
 * @param {object} children_object - full expense group children object
 */
export const obtainExpenseGroupChildren = ( id, children_object ) =>
	mapOverKeys(
		filterKeyedObjectListByAttribute( children_object, "parentID", id ),
		children_object,
		"id"
	);

/**
 * Super unreadable function to reduce a list down to a boolean.
 * @see App.js
 * @see Expense_Group_Options_Dialog.js
 * @param {array} list list of items to reduce to boolean by
 * @param {any} comparison - 'string' or 'object' type.
 * 							  A pair w/ left being an object and right being a string
 * 							  A string will compare by a key lookup on the current list item
 */
export const reduceToBooleanByBoolean = (list, comparison) =>
	list.reduce((isTrue, current) => (isTrue || (!isTrue && (Array.isArray(comparison)) ? comparison[0][current][comparison[1]] : current[comparison] )) ? true : false, false);