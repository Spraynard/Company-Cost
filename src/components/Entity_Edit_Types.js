import {
	capitalizeFirstLetter,
} from "../helpers/helpers";

import {
	cost_uom_values
} from "../helpers/editHelpers";

import PropTypes from 'prop-types';


// MaterialUI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const Base_Prop_Types = {
	title : PropTypes.string,
	input_type: PropTypes.string,
	updateListener: PropTypes.func,
	value : PropTypes.string
}

export const Entity_Edit_Input_Text = ( { title, value, input_type, updateListener } ) => {
	return (
		<FormControl>
		<InputLabel htmlFor={title} >Editing { capitalizeFirstLetter( title ) }</InputLabel>
			<Input
				className="entity-edit-input"
				name={title}
				type={input_type}
				value={value}
				onChange={updateListener}
			/>
		</FormControl>
	)
}

Entity_Edit_Input_Text.propTypes = {
	...Base_Prop_Types,
};

export const Entity_Edit_Input_Number = ( { title, value, input_type, updateListener } ) => {
	return (
		<label>{ capitalizeFirstLetter( title ) }
		<Input
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
			<Select onChange={updateListener} value={value} name={title}>
			<MenuItem value="">Select a value</MenuItem>
			{ options.map( ( option, index ) => {
				return <MenuItem key={index} value={option}>{ capitalizeFirstLetter( option ) }</MenuItem>
			})}
			</Select>
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
			<TextField name={title} value={value} onChange={updateListener} />
		</label>
	)
}

Entity_Edit_Input_Text.propTypes = {
	...Base_Prop_Types
};
