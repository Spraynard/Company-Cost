import { PropTypes } from "prop-types";
import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import {
	Entity_Edit_Input,
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

import readOnlyGroupData from "../../data/read_only_group_data.json";

const Entity_Edit_Field = ( props, { store } ) => {

	let { id, timestamp, updateListener } = props;
	let editableValues = obtainEditableValues( props );
	const {
		expense_group_entity_edit,
	} = store.getState();

	return (
		<form className="entity-edit-field">
			<h4>Editing { props.title }</h4>
			<p>Creation Date: { timestamp }</p>
			{Object.keys( editableValues ).map( ( editable_value, index ) => {
				let input_value = expense_group_entity_edit[id][editable_value];
				let input_type = readOnlyGroupData["edit_subject_input_types"][editable_value];

				let possible_options_list = readOnlyGroupData["expense_group_options"][editable_value];

				if ( input_type === "select" ) {
					// Output a select
					return ( <Entity_Edit_Select
						key={index}
						title={editable_value}
						value={input_value}
						options={possible_options_list}
						updateListener={updateListener}
					/> )
				} else if ( input_type === "textarea" ) {
					// Output a textarea
					return ( <Entity_Edit_Textarea
						key={index}
						title={editable_value}
						value={input_value}
						updateListener={updateListener}
					/> )
				} else {
					// Text or Number type
					return ( <Entity_Edit_Input
						key={index}
						title={editable_value}
						value={input_value}
						input_type={input_type}
						updateListener={updateListener}
					/> );
				}
			})}
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
		</form>
	);
};

Entity_Edit_Field.contextTypes = {
	store : PropTypes.object.isRequired
};

export default Entity_Edit_Field;