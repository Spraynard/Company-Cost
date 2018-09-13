import C from "./constants";
import {
	createStore,
	combineReducers,
	applyMiddleware
} from "redux";
import stateData from "../data/default_state.json";

////////////////////////////
// Expense Group Reducers //
////////////////////////////
import {
	expense_groups,
	expense_group_by_id,
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
	expense_group_entity_edit
} from "./reducers/edit_mode_reducers";

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

/**
 * Middleware that is specifically used when a users saves their edit.
 * Basically we're going to take the material that has been edited in the
 * expense_group_entity_edit state, and overwrite the specifically id'd expense
 * group item in the main state depending on what type of
 */

// TODO: FIX THIS. MOST LIKELY I HAVE TO DISPATCH SOME ACTIONS THAT WILL
// 		THEN TAKE IN THE EDITS. I'M NOT SURE, BUT YEAH
const expense_group_edit_save_helper = store => next => action => {
	// Looking for a save edit action...
	if ( action.type === C.SAVE_ENTITY )
	{
		console.log( action );
		let state = store.getState();

		// Grab the portion of the state that we want
		let expense_group_edit_obj = state.expense_group_entity_edit;
		let expense_group_by_id = state.expense_group_by_id;
		let expense_group_child_by_id = state.expense_group_child_by_id;

		// content of the item that we are going to save into specific state.
		let edited_item_content = expense_group_edit_obj[action.id];

		// Insert the edited content from expense_group_edit_obj into specific state
		if ( expense_group_by_id.hasOwnProperty( action.id ) )
		{
			console.log( "We are trying to save edits on an expense group" );
			// We're saving an expense group edit
			store.expense_group_by_id = {
				...store.expense_group_by_id,
				[ action.id ] : {
					...store.expense_group_by_id[ action.id ],
					...edited_item_content
				}
			};

		}
		else if ( expense_group_child_by_id.hasOwnProperty( action.id ) )
		{
			console.log( "We are trying to save edits on an expense group child" );
			console.lg
			console.log( "Portion of the state", store.expense_group_child_by_id );
			// We're saving an expense group child edit
			store.expense_group_child_by_id = {
				...store.expense_group_child_by_id,
				[ action.id ] : {
					...store.expense_group_child_by_id[ action.id ],
					...edited_item_content
				}
			};
		}
		console.log( "Store", store );
	}

	// Returning the next action should delete the item out of the expense_group_edit_obj state
	return next(action);
};

const store = ( initialState=stateData ) =>
	applyMiddleware(
		logger,
		saver,
		expense_group_child_remove_helper,
		expense_group_edit_save_helper
	)( createStore )(
		combineReducers({
			expense_groups,
			expense_group_by_id,
			expense_group_children,
			expense_group_child_by_id,
			expense_group_children_xref,
			expense_group_entity_edit,
		}),
		( localStorage["company_cost_store"] ) ?
			JSON.parse( localStorage["company_cost_store"] ) :
			initialState
	);

export default store;