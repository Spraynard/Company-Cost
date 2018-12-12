import C from "./constants";
import {
	createStore,
	combineReducers,
	applyMiddleware
} from "redux";

////////////////////////////
// Expense Group Reducers //
////////////////////////////
import {
	expense_groups,
	expense_group_by_id,
	expense_group_options,
	// expense_groups_expense_group_children
} from "./reducers/expense_group_reducers";

//////////////////////////////////
// Expense Group Child Reducers //
//////////////////////////////////
import {
	expense_group_children,
	expense_group_child_by_id,
	expense_group_children_xref,
} from "./reducers/expense_group_children_reducers";

////////////////////////////////////////
// Expense Group Entity Edit Reducers //
////////////////////////////////////////
import {
	expense_group_entity_edit,
} from "./reducers/edit_mode_reducers";

/////////////////////////////////////
// Application Level Edit Reducers //
/////////////////////////////////////
import {
	application_options
} from "./reducers/application_level_reducers";

////////////////
// Middleware //
////////////////
import {
	logger,
	saver,
	expense_group_child_remove_helper
} from "./middleware";

const appReducer = combineReducers({
	expense_groups,
	expense_group_by_id,
	expense_group_children,
	expense_group_child_by_id,
	expense_group_children_xref,
	expense_group_entity_edit,
	expense_group_options,
	application_options
});

import stateData from "../data/default_state.json";
import testState from "../data/test_state.json";

const rootReducer = ( state, action ) => {
	if ( action.type === C.RESET_DATA )
	{
		state = testState; // Reinitialize with initial state
	}

	return appReducer( state, action );
};

const store = ( initialState = stateData ) =>
	applyMiddleware(
		logger,
		saver,
		expense_group_child_remove_helper,
		expense_group_edit_save_helper
	)( createStore )(
		rootReducer,
		( localStorage["company_cost_store"] ) ?
			JSON.parse( localStorage["company_cost_store"] ) :
			initialState
	);

export default store;