const Expense_Group = ({ id, title }) =>
	<div className="expense-group">
		<h3>Expense_Group ID: {id}</h3>
		<div className="expense-group-name">
			{title}
		</div>
	</div>;

export default Expense_Group;