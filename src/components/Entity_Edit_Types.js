import {
	capitalizeFirstLetter,
} from "../helpers/helpers";

import {
	cost_uom_values
} from "../helpers/editHelpers";

export const Entity_Edit_Input = ( { title, value, input_type, updateListener } ) => {
	return (
		<label>Editing { capitalizeFirstLetter( title ) }
		{ ( input_type === "number" ) ?
			<input
				className="entity-edit-input"
				name={title}
				type={input_type}
				step="0.01"
				value={value}
				onChange={updateListener}
			/>
			:
			<input
				className="entity-edit-input"
				name={title}
				type={input_type}
				value={value}
				onChange={updateListener}
			/> }
		</label>
	)
}

export const Entity_Edit_Select = ( { title, value, input_type, updateListener } ) => {
	let inner_option_array = [];

	if ( title === "costUOM" ) {
		inner_option_array = cost_uom_values();
	}

	return (
		<label>{ capitalizeFirstLetter( title ) }
			<select onChange={updateListener} value={value} name={title}>
			<option value="">Select a value</option>
			{ inner_option_array.map( ( option, index ) => {
				return <option key={index} value={option}>{ capitalizeFirstLetter( option ) }</option>
			})}
			</select>
		</label>
	)
}

export const Entity_Edit_Textarea = ( { title, value, input_type, updateListener } ) => {
	var textarea_placeholder_text = null;

	if ( title === "description" ) {
		textarea_placeholder_text = "Insert a Description";
	}

	return (
		<label>{ capitalizeFirstLetter( title ) }
			<textarea name={title} value={value} onChange={updateListener} />
		</label>
	)
}