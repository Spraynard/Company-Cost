import { PropTypes } from "prop-types";
import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import { Entity_Edit_Input } from "./Entity_Edit_Input";

import {
	saveEntity,
	cancelEditEntity
} from "../actions";

import {
	obtainEditableValues
} from "../helpers/editHelpers";

const Entity_Edit_Field = ( props, { store } ) => {

	// let { id, timestamp, edit, parentID, updateListener, ...editableValues } = props;
	let editableValues = obtainEditableValues( props );
	console.log( "Editable Values", editableValues );
	const { expense_group_entity_edit } = store.getState();

	return (
		<form className="entity-edit-field">
			<h4>Editing { props.title }</h4>
			<p>Creation Date: { timestamp }</p>
			{Object.keys( editableValues ).map( ( editable_value, index ) => {
				// let input_value = expense_group_entity_edit[id][editable_value];
				// let input_type = obtain_input_type( input_value );
				console.log( editable_value );
				return ( <Entity_Edit_Input
					key={index}
					title={editable_value}
					value={input_value}
					input_type={input_type}
					updateListener={updateListener}
				/> );
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