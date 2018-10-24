export const expense_group_editable_values = ( input_object ) => {
	return {
		title : input_object.title || "",
		description : input_object.description || ""
	};
};

export const expense_group_child_editable_values = ( input_object ) => {
	return {
		title : input_object.title || "",
		description : input_object.description || "",
		cost: input_object.cost || 0,
		costUOM: input_object.costUOM || "",
	};
};

const edit_value_type_list = () => {
	return {
		title : "text",
		description : "textarea",
		cost : "number",
		costUOM : "select",
	};
};

export const obtainEditableValues = ( _obj ) => {
	let editable_value_object = {};
	Object.keys( _obj ).filter( item => {
		return Object.keys(edit_value_type_list()).contains( item );
	}).forEach( value => {
		editable_value_object[value].value = _obj[value];
		editable_value_object[value].type = edit_value_type_list()[value];
	});

	return editable_value_object;
};