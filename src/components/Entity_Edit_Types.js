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