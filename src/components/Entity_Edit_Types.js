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

export const Entity_Edit_Input = ( { title, value, input_type, options, input_props, select_props, updateListener } ) => {
	return (
		<TextField
			margin="normal"
			variant="filled"
			label={capitalizeFirstLetter(title)}
			name={title}
			value={value}
			onChange={updateListener}
			inputProps={input_props}
			selectProps={select_props}
		/>
	)
}
export const Entity_Edit_Input_Text = ( { title, value, input_type, updateListener } ) => {
	return (
		<FormControl>
		<InputLabel htmlFor={title} >Editing { capitalizeFirstLetter( title ) }</InputLabel>
			<Input
				variant="filled"
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


const number_input_props = {
	step : 0.01,
	type : 'number'
}

export const Entity_Edit_Input_Number = ( { title, value, input_type, updateListener } ) => {
	return (
		<TextField
			margin="normal"
			variant="filled"
			label={capitalizeFirstLetter(title)}
			name={title}
			value={value}
			onChange={updateListener}
			inputProps={number_input_props}
		/>
	);
}

Entity_Edit_Input_Number.propTypes = {
	...Base_Prop_Types,
	value : PropTypes.number
};


export const Entity_Edit_Select = ( { title, value, input_type, options, updateListener } ) => {
	let inner_option_array = [];

	return (
		<FormControl>
		<InputLabel htmlFor={title}>{ capitalizeFirstLetter( title ) }</InputLabel>
			<Select onChange={updateListener} value={value} name={title}>
			<MenuItem value="">Select a value</MenuItem>
			{ options.map( ( option, index ) => {
				return <MenuItem key={index} value={option}>{ capitalizeFirstLetter( option ) }</MenuItem>
			})}
			</Select>
		</FormControl>
	)
}

Entity_Edit_Select.propTypes = {
	...Base_Prop_Types,
	options : PropTypes.array
};


export const Entity_Edit_Textarea = ( { title, value, input_type, updateListener } ) => {
	var textarea_placeholder_text = null;

	if ( title === "description" ) {
		textarea_placeholder_text = "Insert a Description";
	}

	return (
		<TextField
			multiline
			margin="normal"
			variant="filled"
			label={capitalizeFirstLetter(title)}
			name={title}
			value={value}
			onChange={updateListener}
		/>
	)
}

Entity_Edit_Textarea.propTypes = {
	...Base_Prop_Types
};
