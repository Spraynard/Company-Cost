import readOnlyGroupData from '../../data/read_only_group_data.json';

export const expense_group_editable_values = ( input_object ) => {
	return {
		title : input_object.title || "Expense Group",
		description : input_object.description || "",
	};
};

export const expense_group_child_editable_values = ( input_object ) => {
	return {
		title : input_object.title || "Expense Group Child",
		description : input_object.description || "",
		cost: input_object.cost || 0,
		costUOM: input_object.costUOM || "",
	};
};

export const edit_value_type_list = () => {
	return {
		title : "text",
		description : "textarea",
		cost : "number",
		costUOM : "select",
	};
};

export const cost_uom_values = () => {
	return [
		'day',
		'hour',
		'week',
		'month',
		'year'
	];
}

export const obtainEditableValues = ( _obj ) => {
	let editable_value_object = {};
	Object.keys( _obj ).filter( item => {
		return Object.keys(readOnlyGroupData["edit_subject_input_types"]).includes( item );
	}).forEach( value => {
		editable_value_object[value] = {};
		editable_value_object[value].value = _obj[value];
		editable_value_object[value].type = readOnlyGroupData["edit_subject_input_types"][value];
	});

	return editable_value_object;
};