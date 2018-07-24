import {
	createStore,
	combineReducers,
	applyMiddleware
} from "redux";
import stateData from "../data/default_state.json";
import {
	expense_groups,
	expense_group_by_id,
	expense_group_children,
	expense_group_child_by_id,
	expense_group_children_xref,
	expense_groups_expense_group_children
} from "./reducers";

const logger = store => next => action => {
	let result;
	console.groupCollapsed("Dispatching: ", action.type);
	console.log("Prev State: ", store.getState());
	console.log("Action: ", action);
	result = next(action);
	console.log("Next State: ", store.getState());
	console.groupEnd();
	return result;
};

const saver = store => next => action => {
	let result = next(action);
	localStorage["company_cost_store"] = JSON.stringify(store.getState());
	return result;
};

const store = (initialState=stateData) =>
	applyMiddleware(logger, saver)(createStore)(
		combineReducers({
			expense_groups,
			expense_group_by_id,
			expense_group_children,
			expense_group_child_by_id,
			expense_group_children_xref,
			expense_groups_expense_group_children
		}),
		(localStorage["company_cost_store"]) ?
			JSON.parse(localStorage["company_cost_store"]) :
			initialState
	);

export default store;