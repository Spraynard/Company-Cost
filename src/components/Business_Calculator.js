const React = require("react");
const Hashids = require("hashids");

const Expense_Group = require("./Expense_Group.js");
const Stats_Window = require("./Stats_Window.js");

const { Component } = React;

/**
 * Overall controller for the App.
 */
class Business_Calculator extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expenseGroups : []
		};
		this.add_expense_group = this.add_expense_group.bind(this);
		this.remove_expense_group = this.remove_expense_group.bind(this);
		this.provideGroupID = this.provideGroupID.bind(this);
	}

	/**
	 * Provides item ids to multiple different types of items
	 * @param  {String} prefix default 'g' for group,
	 * @return {[type]}        [description]
	 */
	provideItemID( prefix ) {
		const { hashes } = this.state;

		return `${prefix}-${hashes.encode(
			Math.trunc(Math.random() * 100),
			Math.trunc(Math.random() * 100),
			Math.trunc(Math.random() * 100)
		)}`;
	}

	provideGroupID() {
		return this.provideItemID("g");
	}

	provideAssetID() {
		return this.provideItemID("a");
	}

	provideEmployeeID() {
		return this.provideItemID("e");
	}

	add_expense_group() {
		this.setState({
			...this.state,
			expenseGroups : [...this.state.expenseGroups, { id : this.provideGroupID() }]
		});
	}

	// Before the component mounts, we want
	// to make sure we correctly structure the default
	// data.
	componentWillMount() {
		const hashIDs = new Hashids("A Nice Hash");
		this.setState({
			...this.state,
			hashes : hashIDs
		});
	}

	componentDidMount() {
		const { data } = this.props;

		const initializedExpenseGroups = data.map( group => {
			group.id = this.provideGroupID();
			return group;
		});

		this.setState({
			...this.state,
			expenseGroups : initializedExpenseGroups
		});
	}

	remove_expense_group({ id }) {
		var filtered_expense_groups = this.state.expenseGroups.filter( group => {
			return group.id !== id;
		});

		this.setState({
			expenseGroups : filtered_expense_groups
		});
	}

	render() {
		const { expenseGroups } = this.state;

		return (
			<div className="business-calculator">
				<div className="expense-fields-container">
					{[...expenseGroups].map(({ id }, index) =>
						<Expense_Group
							key={index}
							id={id}
							// data_fields={}
							clickToRemove={(event) => this.remove_expense_group({ event, id })}
						/>
					)}
					<button
						className="expense-field-add_button"
						onClick={this.add_expense_group}
					>
						Add Group
					</button>
				</div>
				<div className="statistics-window">
					<Stats_Window />
				</div>
			</div>
		);
	}
}

module.exports = Business_Calculator;