import CloseIcon from "@material-ui/icons/Close";
import ButtonBase from "@material-ui/core/ButtonBase";
import { styled } from "@material-ui/core/styles";

const Close_Icon_Button = ({ onClick }) =>
	<ButtonBase onClick={onClick}><CloseIcon/></ButtonBase>;

const Remove_Expense_Group_Child_Button = styled(Close_Icon_Button)({
	cursor : "pointer",

});

export default Remove_Expense_Group_Child_Button;