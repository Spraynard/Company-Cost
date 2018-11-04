import { PropTypes } from "prop-types";
import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import {
	Entity_Edit_Input_Text,
	Entity_Edit_Input_Number,
	Entity_Edit_Select,
	Entity_Edit_Textarea
} from "./Entity_Edit_Types";

import {
	saveEntity,
	cancelEditEntity
} from "../actions";

import {
	obtainEditableValues,
	edit_value_type_list,
} from "../helpers/editHelpers";

import {
	capitalizeFirstLetter,
} from "../helpers/helpers";


import readOnlyGroupData from "../../data/read_only_group_data.json";

// MaterialUI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

import { withStyles } from '@material-ui/core/styles';

// Material UI Styles
const styles = theme => ({
	root : {
		display : "flex",
		flexDirection : "column",
		textAlign : "left",
	},
})

const Entity_Edit_Field = ( props, { store } ) => {

	let { id, timestamp, updateListener } = props;
	let editableValues = obtainEditableValues( props );
	const {
		expense_group_entity_edit,
	} = store.getState();

	// Material UI Classes
	const { classes } = props;

	return (
		<Card >
			<form className={classes.root}>
				<CardHeader
					title={`Editing ${props.title}`}
					subheader={`Creation Date ${timestamp}`}
				/>
				<CardContent>
				{	Object.keys( editableValues ).map( ( editable_value, index ) => {

						let input_type = readOnlyGroupData["edit_subject_input_types"][editable_value];
						let input_value = expense_group_entity_edit[id][editable_value];

						let input_prop_object = {
							margin : 'normal',
							variant : 'filled',
							label : capitalizeFirstLetter(editable_value),
							name : editable_value,
							onChange : updateListener,
							value : input_value,
							fullWidth : true
						}

						let possible_options_list = readOnlyGroupData["expense_group_options"][editable_value];

						if ( input_type === "number" )
						{
							input_prop_object['inputProps'] = {
								// type : 'number',
								// step : 0.01,
							}

							input_prop_object['InputProps'] = {
								startAdornment : (
									<InputAdornment variant="filled" position="start">
										$
									</InputAdornment>
								)
							}
						}

						if ( input_type === "textarea" )
						{
							input_prop_object['multiline'] = true;
						}

						if ( input_type === "select" )
						{
							input_prop_object['InputProps'] = {
								startAdornment : (
									<InputAdornment variant="filled" position="start">
										/
									</InputAdornment>
								)
							}

							return (
								<TextField
									key={index}
									{...input_prop_object}
									select
								>
									{ possible_options_list.map( ( option, index ) => {
										return (
											<MenuItem
												key={option}
												value={option}
											>
												{capitalizeFirstLetter( option )}
											</MenuItem>
										)
									})}
								</TextField>
							)
						}
						else
						{
							return (
								<TextField
									key={index}
									{...input_prop_object}
								/>
							)
						}
					}
				)}
				</CardContent>
				<CardActions>
					<Entity_Manipulation_Button
						dispatchAction={saveEntity({
							id : id
						})}
						text="Save"
						extraClasses={["expense-group-save-edit-button"]}
					/>
					<Entity_Manipulation_Button
						dispatchAction={cancelEditEntity({
							id : id
						})}
						text="Cancel"
						extraClasses={["expense-group-cancel-edit-button"]}
					/>
				</CardActions>
			</form>
		</Card>
	);
};

Entity_Edit_Field.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Entity_Edit_Field);