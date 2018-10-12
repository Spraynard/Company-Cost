import { capitalizeFirstLetter } from "../helpers/helpers";

export const Entity_Edit_Input = ( { title, value, input_type, updateListener } ) =>
	<label>Editing { capitalizeFirstLetter( title ) }
		{input_type === "number" ?
			<input
				className="entity-edit-input"
				name={title}
				type={input_type}
				step="0.01"
				value={value}
				onChange={updateListener}
			/> :
			<input
				className="entity-edit-input"
				name={title}
				type={input_type}
				value={value}
				onChange={updateListener}
			/>
		}
	</label>;