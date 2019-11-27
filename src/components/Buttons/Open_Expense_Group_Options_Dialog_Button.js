import Entity_Manipulation_Button from "./Entity_Manipulation_Button";
import MoreHoriz from "@material-ui/icons/MoreHoriz";

const Open_Expense_Group_Options_Dialog_Button = ({ action }) => <Entity_Manipulation_Button icon={<MoreHoriz />} variant="outlined" action={action} />;

export default Open_Expense_Group_Options_Dialog_Button;