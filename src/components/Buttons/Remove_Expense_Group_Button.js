import Entity_Manipulation_Button from "./Entity_Manipulation_Button"
import DeleteForever from "@material-ui/icons/DeleteForever";

const Remove_Expense_Group_Button = ({ action }) => <Entity_Manipulation_Button action={action} icon={<DeleteForever/>} variant="outlined"/>

export default Remove_Expense_Group_Button;