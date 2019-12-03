/**
 * Validates input value string by returning the input if valid, but returning nothing if not.
 * @param {string} name Name of the expense group child property that we are updating.
 * @param {string}	   value value of the expense group child property that we are updating.
 */
export const expense_group_child_validator = ( name, value ) => {
	let regex;

	switch (name) {
		case "cost":
			regex = /^[0-9\b]+\.{0,1}?[0-9\b]{0,2}?$/g;
			break;
		default:
			regex = /.*/g;
	}

	return regex.test( value ) ? { [name] : value } : {};
};