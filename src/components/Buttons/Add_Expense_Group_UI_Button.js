import Typography from "@material-ui/core/Typography";
import AddCircle from "@material-ui/icons/AddCircle";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root : {
		background: "linear-gradient(to right, #43cea2, #185a9d)",//'linear-gradient(to right, #b3ffab, #12fff7)',//'linear-gradient(131deg, rgba(231,255,231,1) 0%, rgba(76,255,105,1) 100%)',
		border: `1px solid ${theme.palette.grey[300]}`,
		color : theme.palette.grey[200],
		cursor: "pointer",
		display : "flex",
		flexDirection : "column",
		height : "250px",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		width : "100%",
		transition : theme.transitions.create(["box-shadow", "color"]),
		"&::before": {
			border: `1px solid ${theme.palette.grey[300]}`,
			content: "' '",
			margin: theme.spacing(2),
			position: "absolute",
			transition: theme.transitions.create(["border"]),
			top: "0",
			left: "0",
			right: "0",
			bottom: "0"
		},
		"&:hover" : {
			border: `1px solid ${theme.palette.common.white}`,
			boxShadow : theme.shadows[10],
			color: theme.palette.common.white,
			"&::before" : {
				border: `1px solid ${theme.palette.common.white}`,
			}
		},
		"&:active" : {
			boxShadow : theme.shadows[1]
		},
	},
	icon : {
		fontSize: theme.typography.fontSize * 4 + "px",
	}
});

const Add_Expense_Group_UI_Button = withStyles(styles)(({ classes, action, ...props }) =>
	<Paper className={classes.root} component="button" elevation={6} onClick={action}>
		<Typography variant="h5">{"Add Expense Group".toUpperCase()}</Typography>
		<AddCircle className={classes.icon}/>
	</Paper>
);

export default Add_Expense_Group_UI_Button;