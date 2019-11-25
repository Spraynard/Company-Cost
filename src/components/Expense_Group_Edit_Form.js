import { PropTypes } from "prop-types";
import Entity_Manipulation_Button from "./Buttons/Entity_Manipulation_Button";

import { saveEntity, cancelEditEntity } from "../actions/entity_actions";

import {
	obtainEditableValues,
} from "../helpers/editHelpers";

import {
	capitalizeFirstLetter,
} from "../helpers/helpers";


import readOnlyGroupData from "../../data/read_only_group_data.json";

// MaterialUI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

import { withStyles } from "@material-ui/core/styles";

// Material UI Styles
const styles = {
	root : {
		display : "flex",
		flexDirection : "column",
		textAlign : "left",
	},
};

const Expense_Group_Edit_form = ( props, { store } ) => {

	let { id, timestamp, update_handler } = props;
	let editableValues = obtainEditableValues( props );
	const {
		expense_group_entity_edit,
	} = store.getState();

	// Material UI Classes
	const { classes } = props;

	return (
		<Card >
			<form classes={{ root: classes.root}} >
				<CardHeader
					title={`Editing ${props.title}`}
					subheader={`Creation Date ${timestamp}`}
				/>
				<CardContent>
					{	Object.keys( editableValues ).map( ( editable_value, index ) => {

						let input_type = readOnlyGroupData["edit_subject_input_types"][editable_value];
						let input_value = expense_group_entity_edit[id][editable_value];

						let input_prop_object = {
							margin : "normal",
							variant : "filled",
							label : capitalizeFirstLetter(editable_value),
							name : editable_value,
							onChange : update_handler,
							value : input_value,
							fullWidth : true
						};

						let possible_options_list = readOnlyGroupData["expense_group_options"][editable_value];

						if ( input_type === "number" )
						{
							input_prop_object["inputProps"] = {
								type : "number",
								step : 0.01,
							};

							input_prop_object["InputProps"] = {
								startAdornment : (<InputAdornment variant="filled" position="start">$</InputAdornment>)
							};
						}

						if ( input_type === "textarea" )
						{
							input_prop_object["multiline"] = true;
						}

						if ( input_type === "select" )
						{
							input_prop_object["InputProps"] = {
								startAdornment : (<InputAdornment variant="filled" position="start">/</InputAdornment>)
							};

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
										);
									})}
								</TextField>
							);
						}
						else
						{
							return (
								<TextField
									key={index}
									{...input_prop_object}
								/>
							);
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
						color="secondary"
					/>
					<Entity_Manipulation_Button
						dispatchAction={cancelEditEntity({
							id : id
						})}
						text="Cancel"
						variant="outlined"
						color="secondary"
					/>
				</CardActions>
			</form>
		</Card>
	);
};

Expense_Group_Edit_form.contextTypes = {
	store : PropTypes.object.isRequired
};

export default withStyles(styles)(Expense_Group_Edit_form);