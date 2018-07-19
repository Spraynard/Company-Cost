import C from "../../src/constants";
import {
	expense_groups_expense_group_children,
	expense_groups,
	expense_group_by_id,
	expense_group_children,
	expense_group_child_by_id,
	expense_group_children_xref
} from "../../src/reducers.js";

// describe("Expense Group Controller", () => {
// 	var state;

// 	beforeEach(() => {
// 		state = {
// 			"expense_groups" : [],
// 			"expense_group_by_id" : {},
// 			"expense_groups_expense_group_children" : {}
// 		};
// 	});

// 	test("Will successfully add an expense group", () => {
// 		var action = {
// 			type: C.ADD_EXPENSE_GROUP,
// 			id : 0
// 		};

// 		var results = expenseGroupController( state, action );

// 		expect( results ).toEqual({
// 			"expense_groups" : [ 0 ],
// 			"expense_group_by_id" : { 0 : {} },
// 			"expense_groups_expense_group_children" : { 0 : [] }
// 		});
// 	});

// 	// test("Will successfully remove an expense group", () => {
// 	// 	var action = {
// 	// 		type: C.REMOVE_EXPENSE_GROUP,
// 	// 		id : 0
// 	// 	};

// 	// 	var results = expenseGroupController(state, )
// 	// });
// });

describe("Expense Groups Expense Group Children", () => {
	var state;

	beforeEach(() => {
		state = {};
	});

	test("Returns state on action not having a type", () => {
		var action = {
			id : 0,
			childID : 1,
		};

		var results = expense_groups_expense_group_children( state, action );

		expect( results ).toEqual({});
	});

	test("Will add an expense group child to uninitialized state.", () => {
		var action = {
			type : C.ADD_EXPENSE_GROUP_CHILD,
			parentID : 0,
			id : 1
		};

		var results = expense_groups_expense_group_children( state, action );

		expect( results ).toEqual({
			0 : [ 1 ]
		});
	});

	test("Will add an expense group child to initialized state.", () => {
		state["0"] = [ 2 ];

		var action = {
			type : C.ADD_EXPENSE_GROUP_CHILD,
			parentID : 0,
			id : 1
		};

		var results = expense_groups_expense_group_children( state, action );

		expect( results ).toEqual({
			0 : [ 2, 1 ]
		});
	});

	test("Will remove an expense group from the state", () => {
		state = {
			0 : [ 1, 2, 3, 4 ]
		};

		var action = {
			type : C.REMOVE_EXPENSE_GROUP,
			parentID : 0
		};

		var results = expense_groups_expense_group_children( state, action );

		expect( results ).toEqual({});
	});

	test("Will remove an expense group child from the state", () => {
		state = {
			0 : [ 1, 2, 3, 4 ]
		};

		var action = {
			type : C.REMOVE_EXPENSE_GROUP_CHILD,
			parentID : 0,
			id : 3
		};

		var results = expense_groups_expense_group_children( state, action );

		expect( results ).toEqual({
			0 : [ 1, 2, 4 ]
		});
	});
});

describe("Expense Groups", () => {
	var state;

	beforeEach(() => {
		state = [];
	});

	test("Will return initial state if there is no type given.", () => {
		var action = {
			id : 0
		};

		var results = expense_groups( state, action );

		expect( results ).toEqual([]);
	});

	test("Will add an expense group ID to the state array", () => {
		var action = {
			type : C.ADD_EXPENSE_GROUP,
			id : 0
		};

		var results = expense_groups( state, action );

		expect( results ).toEqual([ 0 ]);
	});

	test("Will remove an expense group ID from the state array", () => {
		state = [ 1, 2, 3, 4 ];

		var action = {
			type: C.REMOVE_EXPENSE_GROUP,
			id : 2
		};

		var results = expense_groups( state, action );

		expect( results ).toEqual([ 1, 3, 4 ]);
	});
});

describe("Expense Group", () => {
	var state;

	beforeEach(() => {
		state = {};
	});

	test("Returns state on action not having a type", () => {
		var action = {
			id : 0,
			title : "Expense Group 1",
			timestamp : new Date().toString()
		};

		var results = expense_group_by_id( state, action );

		expect( results ).toEqual({});
	});

	test("Will add an expense group, key => id, value => expense group data", () => {
		var action = {
			type : C.ADD_EXPENSE_GROUP,
			id : 0,
			title : "Expense Group 1",
			timestamp : new Date().toString(),
		};

		var results = expense_group_by_id( state, action );

		expect( results ).toEqual({
			0 : {
				title : "Expense Group 1",
				timestamp : action.timestamp
			}
		});
	});

	test("Will remove an expense group from the state", () => {
		state = {
			0 : {
				title : "Expense Group 1",
				timestamp : new Date().toString()
			}
		};

		var action = {
			type : C.REMOVE_EXPENSE_GROUP,
			id : 0
		};

		var results = expense_group_by_id( state, action );

		expect( results ).toEqual({});
	});
});

describe("Expense GroupChildren", () => {
	var state;

	beforeEach(() => {
		state = [];
	});

	test("Will return initial state if there is no type given.", () => {
		var action = {
			id : 0
		};

		var results = expense_group_children( state, action );

		expect( results ).toEqual([]);
	});

	test("Will add an expense group ID to the state array", () => {
		var action = {
			type : C.ADD_EXPENSE_GROUP_CHILD,
			id : 0
		};

		var results = expense_group_children( state, action );

		expect( results ).toEqual([ 0 ]);
	});

	test("Will remove an expense group ID from the state array", () => {
		state = [ 1, 2, 3, 4 ];

		var action = {
			type: C.REMOVE_EXPENSE_GROUP_CHILD,
			id : 2
		};

		var results = expense_group_children( state, action );

		expect( results ).toEqual([ 1, 3, 4 ]);
	});
});

describe("Expense GroupChild", () => {
	var state;

	beforeEach(() => {
		state = {};
	});

	test("Returns state on action not having a type", () => {
		var action = {
			id : 0,
			childID : 1,
		};

		var results = expense_group_child_by_id( state, action );

		expect( results ).toEqual({});
	});

	test("Will add an expense group child to uninitialized state.", () => {
		var action = {
			type : C.ADD_EXPENSE_GROUP_CHILD,
			id : 0,
			title : "test",
			description : "this is a test",
			cost : 12.03,
			costUOM : "hour"
		};

		var results = expense_group_child_by_id( state, action );

		expect( results ).toEqual({
			0 : {
				title : action.title,
				description : action.description,
				cost : action.cost,
				costUOM : action.costUOM
			}
		});
	});

	test("Will add an expense group child to initialized state.", () => {
		state["0"] = {
			title : "test",
			description : "this is a test",
			cost : 12.03,
			costUOM : "hour"
		};

		var action = {
			type : C.ADD_EXPENSE_GROUP_CHILD,
			id : 1,
			title : "another test",
			description : "this is a test",
			cost : 16.25,
			costUOM : "hour"
		};

		var results = expense_group_child_by_id( state, action );

		expect( results ).toEqual({
			0 : {
				title : "test",
				description : "this is a test",
				cost : 12.03,
				costUOM : "hour"
			},
			1 : {
				title : action.title,
				description : action.description,
				cost : action.cost,
				costUOM : action.costUOM
			}
		});
	});

	test("Will remove an expense group child from the state", () => {
		state = {
			0 : {
				title : "test",
				description : "this is a test",
				cost : 12.03,
				costUOM : "hour"
			}
		};

		var action = {
			type : C.REMOVE_EXPENSE_GROUP_CHILD,
			id : 0
		};

		var results = expense_group_child_by_id( state, action );

		expect( results ).toEqual({});
	});
});

describe("Expense Group XRefferee", () => {
	var state;

	beforeEach(() => {
		state = {};
	});

	test("Returns state object when not fed a type", () => {
		var action = {
			id: 0,
			parentID: 1
		};
		var results = expense_group_children_xref( state, action );

		expect( results ).toEqual({});
	});

	test("Returns state object when fed an undefined type", () => {
		var action = {
			type: "ADD_UR_MOM",
			id: 0,
			parentID: 1
		};
	});

	test("Adding Expense Group Child", () => {
		var action = {
			type: C.ADD_EXPENSE_GROUP_CHILD,
			id: 0,
			parentID: 1
		};
		var results = expense_group_children_xref( state, action );

		expect( results ).toEqual({
			1 : [ 0 ]
		});
	});

	test("Removing Expense Group Child", () => {
		state = {
			1 : [ 0, 1, 2]
		}
		var action = {
			type: C.REMOVE_EXPENSE_GROUP_CHILD,
			id: 0,
			parentID: 1
		};
		var results = expense_group_children_xref( state, action );

		expect( results ).toEqual({
				1 : [ 1, 2 ]
		});
	});

	test("Deletes Parent from state if there are no more xref children left", () => {
		state = {
			1 : [ 0 ]
		}

		var action = {
			type: C.REMOVE_EXPENSE_GROUP_CHILD,
			id: 0,
			parentID : 1
		}

		var results = expense_group_children_xref( state, action);

		expect( results ).toEqual({});
	});
});

// describe("Expense Group Child Controller", () => {
// 	var state;

// 	beforeEach(() => {
// 		state = {
// 			"expense_group_children" : [],
// 			"expense_group_child_by_id" : {},
// 			"expense_group_children_xref" : {}
// 		}
// 	});

// 	test("Adds and expense group child", () => {
// 		var action = {
// 			type : C.ADD_EXPENSE_GROUP_CHILD,
// 			id : 0,
// 			parentID : 1,
// 			name: "test child",
// 			description: "This is a test child",
// 			cost : 1.00,
// 			costUOM : "month"
// 		};

// 		var results = expenseGroupChildController( state, action );

// 		expect( results ).toEqual({
// 			"expense_group_children" : [ 0 ],
// 			"expense_group_child_by_id" : { 0 : {
// 				name : action.name,
// 				description : action.description,
// 				cost : action.cost,
// 				costUOM : action.costUOM
// 			}},
// 			"expense_group_children_xref" : { 1 : [ 0 ] }
// 		});
// 	});

// 	test("Removes an expense group child", () => {
// 		state = {
// 			"expense_group_children" : [ 0 ],
// 			"expense_group_child_by_id" : { 0 : {
// 				name: "test child",
// 				description: "This is a test child",
// 				cost : 1.00,
// 				costUOM : "month"
// 			} },
// 			"expense_group_children_xref" : {
// 				1 : [ 0 ]
// 			}
// 		};

// 		var action = {
// 			type : C.REMOVE_EXPENSE_GROUP_CHILD,
// 			id : 0,
// 			parentID : 1
// 		};

// 		var results = expenseGroupChildController( state, action );

// 		expect(results).toEqual({
// 			"expense_group_children" : [],
// 			"expense_group_child_by_id" : {},
// 			"expense_group_children_xref" : {}
// 		});
// 	});
// })