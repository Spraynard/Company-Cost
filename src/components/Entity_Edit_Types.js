import {
	capitalizeFirstLetter,
} from "../helpers/helpers";

import {
	cost_uom_values
} from "../helpers/editHelpers";

import PropTypes from 'prop-types';

const Base_Prop_Types = {
	title : PropTypes.string,
	input_type: PropTypes.string,
	updateListener: PropTypes.func,
	value : PropTypes.string
}

export const Entity_Edit_Input_Text = ( { title, value, input_type, updateListener } ) => {
	return (
		<label>Editing { capitalizeFirstLetter( title ) }
			<input
				className="entity-edit-input"
				name={title}
				type={input_type}
				value={value}
				onChange={updateListener}
			/>
		</label>
	)
}

Entity_Edit_Input_Text.propTypes = {
	...Base_Prop_Types,
};

export const Entity_Edit_Input_Number = ( { title, value, input_type, updateListener } ) => {
	return (
		<label>{ capitalizeFirstLetter( title ) }
		<input
			className="entity-edit-input"
			name={title}
			type={input_type}
			step="0.01"
			value={value}
			onChange={updateListener}
		/>
		</label>
	);
}

Entity_Edit_Input_Text.propTypes = {
	...Base_Prop_Types,
	value : PropTypes.number
};


export const Entity_Edit_Select = ( { title, value, input_type, options, updateListener } ) => {
	let inner_option_array = [];

	return (
		<label>{ capitalizeFirstLetter( title ) }
			<select onChange={updateListener} value={value} name={title}>
			<option value="">Select a value</option>
			{ options.map( ( option, index ) => {
				return <option key={index} value={option}>{ capitalizeFirstLetter( option ) }</option>
			})}
			</select>
		</label>
	)
}

Entity_Edit_Input_Text.propTypes = {
	...Base_Prop_Types,
	options : PropTypes.array
};


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

Entity_Edit_Input_Text.propTypes = {
	...Base_Prop_Types
};
