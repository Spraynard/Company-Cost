class ExpenseBase {
	constructor( initial = { title , timestamp } ) {
		this.initial = initial;
		this.struct = {
			...initial
		};
	}

	output() {
		return this.struct;
	}
}

class Expense_Group extends ExpenseBase {
	constructor( initial, edit ) {
		super(initial);
		this.struct = {
			...this.initial,
			edit
		};
		this.edit = this.struct.edit;
	}

	default_expense_group () {
		var group = new Expense_Group( this.initial, false );
		return group.output();
	}
}

class Expense_Group_Child extends ExpenseBase {
	constructor( initial, edit ) {
		super(initial);
		this.struct = {
			...this.initial,
			edit
		};
		this.edit = this.struct.edit;
	}

	default_expense_group_child () {
		var group = new Expense_Group_Child( this.initial, false );
		return group.output();
	}
}