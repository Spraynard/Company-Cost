import C from "./constants";
import {
	createStore,
	combineReducers,
	applyMiddleware
} from "redux";
import stateData from "../data/default_state.json";

import {
	expense_groups,
	expense_group_by_id,
	// expense_groups_expense_group_children
} from "./reducers/expense_group_reducers";

import {
	expense_group_children,
	expense_group_child_by_id,
	expense_group_children_xref,
} from "./reducers/expense_group_children_reducers";

const enable_logger = false;

// Log actions to the console as we dispatch them
const logger = store => next => action => {
	let result;

	if ( ! enable_logger )
	{
		return next(action);
	}
	console.groupCollapsed("Dispatching: ", action.type);
	console.log("Prev State: ", JSON.stringify(store.getState(), null, 4));
	console.log("Action: ", JSON.stringify(action, null, 4));
	result = next(action);
	console.log("Next State: ", JSON.stringify(store.getState(), null, 4));
	console.groupEnd();
	return result;
};

// On action, store the state into our localStorage object, which is mainly in the browser, but is being
// mocked here in this program under "local_stoarage_mock.js"
const saver = store => next => action => {
	let result = next(action);
	localStorage["company_cost_store"] = JSON.stringify(store.getState());
	return result;
};

/**
 * Middleware that is specifically for tying some loose ends on an expense group child remove action.
 * Basically, if we are missing a parent ID from our action ( which is used by the expense_group_child_xref to filter out the expense group children )
 * we will add that data on the action based on our overall state.
 */
const expense_group_child_remove_helper = store => next => action => {
	// Find out what kind of action we have
	if ( action.type === C.REMOVE_EXPENSE_GROUP_CHILD && typeof action.parentID === "undefined" )
	{
		let state = store.getState();
		let child_by_id_obj = state.expense_group_child_by_id;
		/**
		 * action.id is going to be the ID of the expense group child because of how
		 * C.REMOVE_EXPENSE_GROUP_CHILD is set up.
		 */
		let childrens_parent_id = child_by_id_obj[action.id].parentID;

		// Now we inject the parentID into the action
		action.parentID = childrens_parent_id;
	}

	return next(action);
};

const store = (initialState=stateData) =>
	applyMiddleware(logger, saver, expense_group_child_remove_helper)(createStore)(
		combineReducers({
			expense_groups,
			expense_group_by_id,
			expense_group_children,
			expense_group_child_by_id,
			expense_group_children_xref,
			// expense_groups_expense_group_children
		}),
		(localStorage["company_cost_store"]) ?
			JSON.parse(localStorage["company_cost_store"]) :
			initialState
	);

export default store;