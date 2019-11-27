import Entity_Manipulation_Button from "./Entity_Manipulation_Button";

const Edit_Expense_Group_Button = ({ action }) => <Entity_Manipulation_Button style={{ cursor : "context-menu" }} text="Edit Group" variant="outlined" action={action}/>;

export default Edit_Expense_Group_Button;