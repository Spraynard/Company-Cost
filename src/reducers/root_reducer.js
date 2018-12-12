import { combineReducers } from "redux";

///////////////
// Constants //
///////////////
import C from "../constants";

////////////////////////////
// Expense Group Reducers //
////////////////////////////
import {
	expense_groups,
	expense_group_by_id,
	expense_group_options,
	// expense_groups_expense_group_children
} from "./expense_group_reducers";

//////////////////////////////////
// Expense Group Child Reducers //
//////////////////////////////////
import {
	expense_group_children,
	expense_group_child_by_id,
	expense_group_children_xref,
} from "./expense_group_children_reducers";

////////////////////////////////////////
// Expense Group Entity Edit Reducers //
////////////////////////////////////////
import {
	expense_group_entity_edit,
} from "./edit_mode_reducers";

/////////////////////////////////////
// Application Level Edit Reducers //
/////////////////////////////////////
import {
	application_options
} from "./application_level_reducers";

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

import testState from "../../data/test_state.json";

export const rootReducer = ( state, action ) => {
	if ( action.type === C.RESET_DATA )
	{
		state = testState; // Reinitialize with initial state
	}

	return appReducer( state, action );
};