export const expense_group_options_values = (input_object) => ({
	options : {
		costUOM : input_object.costUOM || "day",
		size : input_object.size || "default"
	}
});