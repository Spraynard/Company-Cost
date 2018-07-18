const React = require('react');

const Expense_Group = ({ id, title, clickToRemove }) =>
	<div className="expense-field">
		<h3>Expense_Group ID: {id}</h3>
		<div className="expense-field-name">
			{title}
		</div>
		<button onClick={clickToRemove}>Remove Field</button>
	</div>;

module.exports = Expense_Group;