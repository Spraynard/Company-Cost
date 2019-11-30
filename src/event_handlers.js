import K from "./key_constants";

export const expense_group_child_keydown_event_listener = child_props => event => {
	const key = event.which;

	// Do not affect children edit inputs with our event listeners.
	if (event.target.nodeName !== "INPUT") {

		// Do not scroll down on space key
		// Do not go back in browser history
		if (key === K.SPACE_KEY || key === K.BACKSPACE_KEY) {
			event.preventDefault();
		}

		// Remove child on backspace or delete key
		switch (key) {
			case K.BACKSPACE_KEY:
			case K.DELETE_KEY:
				child_props.child_remove_handler();
				break;
		}
	}

	// Open up edit menu on enter or space
	if (! child_props.child_data.edit && (key === K.ENTER_KEY || key == K.SPACE_KEY)) {
		/**
         * This stops ENTER_KEY event from reaching global
         * keyboardListener()
         */
		event.stopPropagation();
		child_props.edit_context_handler();
	}

};