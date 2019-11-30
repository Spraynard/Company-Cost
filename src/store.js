import {
	createStore,
	applyMiddleware
} from "redux";

// Root reducer bundles up all of the app's reducers
// but allows for application level actions to occur.
import {
	rootReducer
} from "./reducers/root_reducer";

////////////////
// Middleware //
////////////////
import {
	logger,
	saver,
	expense_group_child_add_parent_id,
	expense_group_child_only_one_at_a_time,
	expense_group_edit_save_helper,
	expense_group_remove_helper,
	entity_edit_helper
} from "./middleware";

// Default State or test state
import stateData from "../data/default_state.json";

export const store = ( initialState = stateData ) =>
	applyMiddleware(
		logger,
		saver,
		expense_group_child_add_parent_id,
		expense_group_child_only_one_at_a_time,
		expense_group_edit_save_helper,
		expense_group_remove_helper,
		entity_edit_helper
	)( createStore )(
		rootReducer,
		( localStorage["company_cost_store"] ) ?
			JSON.parse( localStorage["company_cost_store"] ) :
			initialState
	);