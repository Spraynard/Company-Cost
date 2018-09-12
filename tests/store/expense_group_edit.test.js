import store from "../../src/store";
import {
	addExpenseGroup,
} from "../../src/actions";

import defaultState from "../../data/default_state.json";

beforeAll(() => {
	test_store = store(defaultState);
	action = addExpenseGroup({ title });
	id = action.id;
	test_store.dispatch(action);
})