/**
 * This whole file is probably deprecated - Kellan M.
 */
class Expense_Base {
	constructor( initial ) {
		this.NameSpace = "Expense_Base";
		this.initial = initial;

		if ( typeof this.initial.timestamp === "undefined" )
		{
			this.initial.timestamp = new Date().toString();
		}
	}

	set_struct() {
		this.struct = {
			...[this.initial]
		};
	}

	output() {
		return this.struct;
	}

	default() {
		var group = new this.NameSpace( this.initial, false );
		return group.output();
	}
}

class Expense_Group extends Expense_Base {
	constructor( initial, edit ) {
		super(initial);
		this.NameSpace = "Expense_Group";
		this.struct = {
			...this.initial,
			edit
		};
		this.edit = this.struct.edit;
	}
}

class Expense_Group_Child extends Expense_Base {
	constructor( initial, edit ) {
		super(initial);
		this.NameSpace = "Expense_Group_Child";
		this.struct = {
			...this.initial,
			edit
		};
		this.edit = this.struct.edit;
	}

}

module.exports = {
	Expense_Base,
	Expense_Group,
	Expense_Group_Child
};
